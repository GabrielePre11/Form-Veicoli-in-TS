"use strict";
// Buttons
const showVehiclesButton = document.querySelector('[data-show]');
// Form
const form = document.querySelector('[data-form]');
// Enums
var typeOfVehicle;
(function (typeOfVehicle) {
    typeOfVehicle["CAR"] = "Car";
    typeOfVehicle["MOTORCYCLE"] = "Motorcycle";
    typeOfVehicle["TRUCK"] = "Truck";
})(typeOfVehicle || (typeOfVehicle = {}));
var typeOfFuel;
(function (typeOfFuel) {
    typeOfFuel["GASOLINE"] = "Gasoline";
    typeOfFuel["DIESEL"] = "Diesel";
    typeOfFuel["ELECTRIC"] = "Electric";
})(typeOfFuel || (typeOfFuel = {}));
// Vehicle properties
const getVehicleProperties = () => {
    return {
        vehiclePlate: document.querySelector('[data-v-plate]').value,
        vehicleName: document.querySelector('[data-v-name]').value,
        vehicleModel: document.querySelector('[data-v-model]').value,
        vehicleYear: parseInt(document.querySelector('[data-v-year]').value, 10),
        vehicleType: document.querySelector('.vehicle-type').value,
        fuelType: document.querySelector('.vehicle-fuel').value
    };
};
// Classes
class Vehicle {
    constructor(plate, name, model, year, vehicleType, fuelType) {
        this.plate = plate;
        this.name = name;
        this.model = model;
        this.year = year;
        this.vehicleType = vehicleType;
        this.fuelType = fuelType;
    }
}
class VehicleRegister {
    constructor() {
        this.vehicles = [];
    }
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }
    getVehicles() {
        return this.vehicles;
    }
}
const vehicleRegistry = new VehicleRegister();
// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { vehiclePlate, vehicleName, vehicleModel, vehicleYear, vehicleType, fuelType } = getVehicleProperties();
    // Vehicle
    const newVehicle = new Vehicle(vehiclePlate, vehicleName, vehicleModel, vehicleYear, vehicleType, fuelType);
    vehicleRegistry.addVehicle(newVehicle);
    form.reset();
});
// Show Vehicles
showVehiclesButton.addEventListener('click', () => {
    const vehicleList = document.querySelector('.show-vehicles');
    vehicleList.textContent = '';
    const vehicles = vehicleRegistry.getVehicles();
    vehicles.forEach((v) => {
        const li = document.createElement('li');
        li.classList.add('vehicle');
        li.textContent = `
                | PLATE: ${v.plate} | NAME: ${v.name} | MODEL: ${v.model} | YEAR: ${v.year} | TYPE: ${v.vehicleType} | FUEL: ${v.fuelType} |`;
        vehicleList.appendChild(li);
    });
    vehicleList.style.display = 'grid';
});
