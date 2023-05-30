const farm = require('./farm');
const sensorNodeAddr = "0xb6fd605e19c69b531dbc314fcf9358cd004e95e3";;
async function getSensorData(addr){
    // console.log("Farm Manager Working fetching data")

    // sensor 1
    var length = await farm.methods.getSensorDataCount(addr).call();
    for (let index = 0; index < length; index++) {
        const fetchData1 = await farm.methods.getSensorDataInfo(addr,index).call();
        console.log('Index: ',index,'\n', fetchData1,'\n');
    }
}

getSensorData(sensorNodeAddr);

// console.log("From Sensor Node2")
// let sensor2 = "0xD496cfBFdFfBE65D47a5eEcc1251fB07Cb65972a";
// getSensorData(sensor2);
