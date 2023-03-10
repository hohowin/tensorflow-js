# tensorflow-js

- Core API: https://js.tensorflow.org/api/latest/
- DataSets: https://www.kaggle.com/datasets
- Visor: https://js.tensorflow.org/api_vis/latest/

## Setup

- When using TypeScript you may need to set `skipLibCheck: true` in your tsconfig.json file if your project makes use of strict null checking or you will run into errors during compilation.

## Serve Data

1/. Download data in csv format

2/. Go to the directory and type `http-server` to serve the data.

3/. Use `tf.data.CSVDataset` to load from the URL. Example:

```javascript
import * as tf from '@tensorflow/tfjs';

const houseSalesDataSet: tf.data.CSVDataset = tf.data.csv("http://localhost:8080/kc_house_data.csv");
const sampleDataSet = houseSalesDataSet.take(10);
const run = async () => {
    const dataArray = await sampleDataSet.toArray();
    console.log(dataArray);
}
run();
```

## Transform Data Example

```javascript
import * as tf from '@tensorflow/tfjs';
import { TensorContainerObject } from '@tensorflow/tfjs';
import { Dataset } from '@tensorflow/tfjs-data';

interface DataType extends TensorContainerObject {
    xs: tf.Tensor;
    ys: tf.Tensor;
}

(async () => {
    const houseSalesDataSet = tf.data.csv("http://localhost:8080/kc_house_data.csv", {
        columnConfigs: {
            bedrooms: { dtype: 'float32' },
            bathrooms: { dtype: 'float32' },
            sqft_living: { dtype: 'float32' },
            sqft_lot: { dtype: 'float32' },
            floors: { dtype: 'float32' },
            waterfront: { dtype: 'float32' },
            view: { dtype: 'float32' },
            condition: { dtype: 'float32' },
            grade: { dtype: 'float32' },
            sqft_above: { dtype: 'float32' },
            sqft_basement: { dtype: 'float32' },
            yr_built: { dtype: 'float32' },
            yr_renovated: { dtype: 'float32' },
            zipcode: { dtype: 'float32' },
            lat: { dtype: 'float32' },
            long: { dtype: 'float32' },
            sqft_living15: { dtype: 'float32' },
            sqft_lot15: { dtype: 'float32' },
            price: { dtype: 'float32' }
        }
    }) as any as Dataset<DataType>;

    const points = houseSalesDataSet.map(record => ({
        x: record.sqft_living,
        y: record.price,
    }));

    console.log(await points.toArray())
})();
```

## Extract Feature and Label

```javascript
import * as tf from '@tensorflow/tfjs';
import { TensorContainerObject } from '@tensorflow/tfjs';
import { Dataset } from '@tensorflow/tfjs-data';

interface DataType extends TensorContainerObject {
    xs: tf.Tensor;
    ys: tf.Tensor;
}

(async () => {
    const houseSalesDataSet = tf.data.csv("http://localhost:8080/kc_house_data.csv", {
        columnConfigs: {
            bedrooms: { dtype: 'float32' },
            bathrooms: { dtype: 'float32' },
            sqft_living: { dtype: 'float32' },
            sqft_lot: { dtype: 'float32' },
            floors: { dtype: 'float32' },
            waterfront: { dtype: 'float32' },
            view: { dtype: 'float32' },
            condition: { dtype: 'float32' },
            grade: { dtype: 'float32' },
            sqft_above: { dtype: 'float32' },
            sqft_basement: { dtype: 'float32' },
            yr_built: { dtype: 'float32' },
            yr_renovated: { dtype: 'float32' },
            zipcode: { dtype: 'float32' },
            lat: { dtype: 'float32' },
            long: { dtype: 'float32' },
            sqft_living15: { dtype: 'float32' },
            sqft_lot15: { dtype: 'float32' },
            price: { dtype: 'float32' }
        }
    }) as any as Dataset<DataType>;

    const points = houseSalesDataSet.map(record => ({
        x: record.sqft_living,
        y: record.price,
    }));

    console.log(await points.toArray())

    // Features (inputs) 1st dimension
    const featureValues = await points.map(p => p.x).toArray();
    const featureTensor = tf.tensor2d(featureValues as any, [featureValues.length, 1]);

    // Labels (outputs) 2nd dimension
    const labelValues = await points.map(p => p.y).toArray();
    const labelTensor = tf.tensor2d(labelValues as any, [labelValues.length, 1]);

    featureTensor.print();
    labelTensor.print();
})();
```