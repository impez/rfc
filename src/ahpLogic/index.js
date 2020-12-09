export class AHPUser {
  constructor({ criteriaItems, variantItems, criteriaRates, variantRates }) {
    this.criteriaItems = criteriaItems;
    this.variantItems = variantItems;
    this.criteriaRates = criteriaRates;
    this.variantRates = variantRates;
  }

  getCriteriaItems = () => this.criteriaItems;

  getVariantItems = () => this.variantItems;

  getCriteriaRates = () => this.criteriaRates;

  getVariantRates = () => this.variantRates;
}

export class AHPItem {
  constructor(comps = {}, items = []) {
    this.comps = comps;
    this.items = items.sort();
  }

  getComps = () => this.comps;

  getItems = () => this.items;

  getMatrix = () => this.matrix;

  getWeights = () => this.weights;

  getMetadata = () => {
    return {
      consistencyRatio: this.consistencyRatio,
      weights: this.weights,
      matrix: this.matrix,
    };
  };

  initProcess = () => {
    let comparisons;
    let curLength;

    if (Object.entries(this.comps).length > 1)
      comparisons = MathHelper.chunkObjects(this.comps);
    else comparisons = [this.comps];

    curLength = comparisons.length;

    for (let i = 0; i < curLength; i++) {
      const newComp = MathHelper.generateReverseComparisonObj(comparisons[i]);
      comparisons.push(newComp);
    }

    comparisons = MathHelper.dechunkObject(comparisons);
    MathHelper.appendDiagonalCells(comparisons, this.items);
    comparisons = MathHelper.orderObjectsAlphabetically(comparisons);
    MathHelper.convertAhpValuesOfObj(comparisons);

    this.matrix = MathHelper.createMatrixOfComparisons(comparisons, this.items);
    this.weights = MathHelper.getWeights(this.matrix, this.items);
    this.consistencyRatio = MathHelper.getConsistencyRatio(
      this.matrix,
      this.weights
    );
  };
}

export class FuzzyMiddleman {
  static getTransformed = (input, n) => {
    const obj = {};
    const arr = [];
    const keys = Object.keys(input);

    for (let i = 0; i < n; i++) {
      arr.push(MathHelper.fuzzyToCrispInput(input));
    }

    for (let i = 0; i < arr.length; i++) {
      for (const key of keys) {
        if (obj[key] === undefined) obj[key] = 0;
        obj[key] += arr[i][key][0];
      }
    }

    for (const [k, v] of Object.entries(obj)) {
      obj[k] = [v / n];
    }

    return obj;
  };
}

export class MathHelper {
  static convertToAhpVal = (val) =>
    val > 0 ? 1 / (val + 1) : Math.abs(val - 1);

  static convertAhpValuesOfObj = (obj) => {
    for (const [k, v] of Object.entries(obj)) {
      obj[k] = [this.convertToAhpVal(v[0])];
    }
  };

  static matrixProduct = (matrix1, matrix2) => {
    let result = [];
    for (let X = 0; X < matrix1.length; X++) {
      let newRow = [];
      for (let Y = 0; Y < matrix2[0].length; Y++) {
        let newDotProd = 0;
        for (let i = 0; i < matrix1[X].length; i++) {
          newDotProd += matrix1[X][i] * matrix2[i][Y];
        }
        newRow.push(newDotProd);
      }
      result.push(newRow);
    }
    return result;
  };

  static getWeights = (matrix, items) => {
    const arr = [];
    const i = [...items];

    let s = 0;

    for (const row of matrix) {
      const itemName = i.shift();
      const itemWeight = Math.pow(
        row.reduce((x, y) => x * y, 1),
        1 / matrix.length
      );

      s += itemWeight;
      arr.push({
        [itemName]: itemWeight,
      });
    }

    return arr.map((obj) => {
      const [k, v] = Object.entries(obj)[0];
      obj[k] = v / s;
      return obj;
    });
  };

  static createMatrixOfComparisons = (comparisonObj, items) => {
    let matrix = [];

    for (const v of Object.values(comparisonObj)) {
      matrix.push(v);
    }

    return this.chunkArray(matrix.flat(), items.length);
  };

  static generateReverseComparisonObj = (obj) => {
    const str = Object.keys(obj)[0];
    const val = Object.values(obj)[0];
    let newStr = str.split(":").reverse().join(":");
    let newVal = -val;

    return { [newStr]: [newVal] };
  };

  static fuzzyToCrispInput = (input) => {
    const cloneStr = JSON.stringify(input);
    const newInput = JSON.parse(cloneStr);

    for (const [k, v] of Object.entries(newInput)) {
      newInput[k] = [this.getRandomChoiceFromTriangle(...v)];
    }

    return newInput;
  };

  static getRandomChoiceFromTriangle = (a, c, b) => {
    if (a > b) {
      let temp = b;
      b = a;
      a = temp;
    }

    let u = Math.random();
    let f;

    if (a === b) {
      return a;
    } else {
      f = (c - a) / (b - a);
    }

    return 0 < u && u < f
      ? a + Math.sqrt(u * (b - a) * (c - a))
      : f < u && u < 1
      ? b - Math.sqrt((1 - u) * (b - a) * (b - c))
      : u === 0
      ? a
      : b; // u === 1
  };

  static getConsistencyRatio = (matrix, weights) => {
    if (matrix.length <= 2) return 0;

    let wgs = weights.map((obj) => Object.values(obj));
    let consistencyIndex;
    let consistencyRatio;
    let lambdaMax;
    const matrixSize = matrix.length;
    const A4 = [];
    const randomIndex = {
      1: 0.0,
      2: 0.0,
      3: 0.58,
      4: 0.9,
      5: 1.12,
      6: 1.24,
      7: 1.32,
      8: 1.41,
      9: 1.45,
      10: 1.49,
    };

    let A3 = this.matrixProduct(
      matrix.map((row) => {
        return row.map((cell) => [cell]);
      }),
      wgs
    );

    A3 = A3.flat();
    wgs = wgs.flat();

    for (let i = 0; i < A3.length; i++) {
      A4.push(A3[i] / wgs[i]);
    }

    lambdaMax = A4.reduce((a, b) => a + b, 0) / A4.length;
    consistencyIndex = (lambdaMax - matrixSize) / (matrixSize - 1);
    consistencyRatio = consistencyIndex / randomIndex[matrixSize];

    return consistencyRatio;
  };

  static chunkArray = (array, pieces) => {
    let a = [],
      i,
      j,
      temparray,
      chunk = pieces;

    for (i = 0, j = array.length; i < j; i += chunk) {
      temparray = array.slice(i, i + chunk);
      a.push(temparray);
    }

    return a;
  };

  static generateDiagonalCell = (item) => {
    const key = `${item}:${item}`;
    const value = 0;

    return { [key]: [value] };
  };

  static dechunkObject = (obj) => {
    return Object.assign({}, ...obj);
  };

  static chunkObjects = (obj) => {
    let strObj = JSON.stringify(obj);
    strObj = strObj
      .split(",")
      .map((item) =>
        item.includes("{")
          ? item.concat("}")
          : item.includes("}")
          ? "{" + item
          : "{" + item + "}"
      );
    return strObj.map((item) => JSON.parse(item));
  };

  static orderObjectsAlphabetically = (obj) => {
    const ordered = {};
    Object.keys(obj)
      .sort()
      .forEach(function (key) {
        ordered[key] = obj[key];
      });

    return ordered;
  };

  static appendDiagonalCells = (incompleteMatrix, items) => {
    for (const item of items) {
      const obj = this.generateDiagonalCell(item);
      incompleteMatrix[Object.keys(obj)[0]] = Object.values(obj)[0];
    }
  };
}
