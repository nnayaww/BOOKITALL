import axios from 'axios';

const mongoApiKey = process.env.MONGO_API_KEY; // Ensure this is set in your .env file
const baseUrl = 'https://eu-central-1.aws.data.mongodb-api.com/app/data-dwxzxfh/endpoint/data/v1/action';

const callMongoAPI = async (data, action) => {
    const config = {
        method: 'post',
        url: `${baseUrl}/${action}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': mongoApiKey,
            'Accept': 'application/ejson'
        },
        data: JSON.stringify(data)
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export async function findOne(collection, database, filter, projection = {}) {
    const data = {
        collection,
        database,
        dataSource: "Cluster0", // Replace with your data source (cluster) name
        filter,
        projection
    };
    return await callMongoAPI(data, 'findOne');
}
export async function find(collection, database, filter = {}, projection = {}) {
    const data = {
        collection,
        database,
        dataSource: "Cluster0", // Replace with your data source (cluster) name
        filter,
        projection
    };
    return await callMongoAPI(data, 'find');
}
export async function insertOne(collection, database, document) {
    const data = {
        collection,
        database,
        dataSource: "Cluster0", // Replace with your data source (cluster) name
        document
    };
    return await callMongoAPI(data, 'insertOne');
}
