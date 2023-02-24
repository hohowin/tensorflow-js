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