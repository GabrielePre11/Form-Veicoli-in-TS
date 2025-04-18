// Buttons
const showVehiclesButton = document.querySelector('[data-show]') as HTMLButtonElement;

// Form
const form = document.querySelector('[data-form]') as HTMLFormElement;

// Enums
enum typeOfVehicle {
    CAR = 'Car',
    MOTORCYCLE = 'Motorcycle',
    TRUCK = 'Truck'
}

enum typeOfFuel {
    GASOLINE = 'Gasoline',
    DIESEL = 'Diesel',
    ELECTRIC = 'Electric'
}

// Vehicle properties
const getVehicleProperties = () => {
    return {
        vehiclePlate: (document.querySelector('[data-v-plate]') as HTMLInputElement).value,
        vehicleName: (document.querySelector('[data-v-name]') as HTMLInputElement).value,
        vehicleModel: (document.querySelector('[data-v-model]') as HTMLInputElement).value,
        vehicleYear: parseInt((document.querySelector('[data-v-year]') as HTMLInputElement).value, 10),
        vehicleType: (document.querySelector('.vehicle-type') as HTMLSelectElement).value as typeOfVehicle,
        fuelType: (document.querySelector('.vehicle-fuel') as HTMLSelectElement).value as typeOfFuel
    };
}

// Classes
class Vehicle {
    constructor(
        public plate: string,
        public name: string,
        public model: string,
        public year: number,
        public vehicleType: typeOfVehicle,
        public fuelType: typeOfFuel
    ) { }
}

class VehicleRegister {
    private vehicles: Vehicle[] = [];

    addVehicle(vehicle: Vehicle): void {
        this.vehicles.push(vehicle);
    }

    getVehicles(): Vehicle[] {
        return this.vehicles;
    }
}

const vehicleRegistry = new VehicleRegister();

// Event listener for form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const { vehiclePlate, vehicleName, vehicleModel, vehicleYear, vehicleType, fuelType } = getVehicleProperties();

    // Vehicle
    const newVehicle = new Vehicle(vehiclePlate, vehicleName, vehicleModel, vehicleYear, vehicleType, fuelType);

    vehicleRegistry.addVehicle(newVehicle);
    form.reset();
});

// Show Vehicles
showVehiclesButton.addEventListener('click', () => {
    const vehicleList = document.querySelector('.show-vehicles') as HTMLUListElement;
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