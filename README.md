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

const plot = (pointsArray, featureName ) => {
    tfvis.render.scatterplot(
        {name: `${featureName} vs House Price`},
        {values: [pointArray], series: ["original"]},
        {
            xLabel: featureName,
            yLabel: "Price",
        }
    );
};

const run = async () => {
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

    plot(await points.toArray(), "Square Feet");
};

run();
```