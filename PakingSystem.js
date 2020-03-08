const NubmerOfSoltsPerarea = 10;
const pricePerHour = 10;
const entryprice = 5;
class Parent {
    constructor(id, areaType, available, currentUser, entryTime, endTime) {
        this.id = id
        this.areaType = areaType
        this.available = available
        this.currentUser = currentUser
        this.entryTime = entryTime
        this.endTime = endTime
    }

}
class motoArea extends Parent {
    constructor(id, areaType, available, currentUser, entryTime, endTime) {
        super(id, areaType, available, currentUser, entryTime, endTime)
    }
}
class carArea extends Parent {
    constructor(id, areaType, available, currentUser, entryTime, endTime) {
        super(id, areaType, available, currentUser, entryTime, endTime)
    }
}
class truckArea extends Parent {
    constructor(id, areaType, available, currentUser, entryTime, endTime) {
        super(id, areaType, available, currentUser, entryTime, endTime)
    }

}
class ticket {
    constructor(client, duration, price) {
        this.client = client
        this.duration = duration
        this.price = price
    }

}
var car_Slots = []
var moto_Slots = []
var truck_Slots = []
var tickets = []
////////create N slots for the three areas/////////
for (let i = 1; i < NubmerOfSoltsPerarea + 1; i++) {
    var carSlot = new carArea(i, 'cartype', 'available', null, null, null)
    var motoSlot = new motoArea(i, 'mototype', 'available', null, null, null)
    var truckSlot = new truckArea(i, 'trucktype', 'available', null, null, null)
    car_Slots.push(carSlot)
    moto_Slots.push(motoSlot)
    truck_Slots.push(truckSlot)
}
motoFreeSlots = 0
truckFreeSlots = 0
var ncarslots = document.getElementById('ncarslots')
carFreeSlots = 0
for (let i = 0; i < car_Slots.length; i++) {
    if (car_Slots[i].available === 'available') {
        carFreeSlots++
    }
}
var nmotoslots = document.getElementById('nmotoslots')
motoFreeSlots = 0
for (let i = 0; i < moto_Slots.length; i++) {
    if (moto_Slots[i].available === 'available') {
        motoFreeSlots++
    }
}
var ntruckslots = document.getElementById('ntruckslots')
truckFreeSlots = 0
for (let i = 0; i < truck_Slots.length; i++) {
    if (truck_Slots[i].available === 'available') {
        truckFreeSlots++
    }
}
nmotoslots.innerHTML = motoFreeSlots
ntruckslots.innerHTML = truckFreeSlots;
ncarslots.innerHTML = carFreeSlots
/////////////////////////////////////////////////////////save User in a slot///////////////////////////////////////////
function save(i, nam) {
    alertone = 'Sorry you should write a client name';
    if (document.getElementsByClassName(nam + 'inputstatus')[i].value == '') {
        alert(alertone)
        
    } else {
    if (nam === 'car') {
        n = car_Slots[i]
        carFreeSlots--
        ncarslots.innerHTML--
        alerttwo = 'this is the last slot here Click Check in truck button above '
        if (carFreeSlots == 0) {
            document.getElementsByClassName(`carrunout`)[0].classList.remove('hidden')
            alert(alerttwo)
            scroll(0, 0)
        }
    }
    if (nam === 'moto') {
        n = moto_Slots[i]
        motoFreeSlots--
        nmotoslots.innerHTML--
        alerttwo = 'this is the last slot here Click Check in cars or truck button above ';
        if (motoFreeSlots == 0) {
            document.getElementsByClassName(`runout`)[0].classList.remove('hidden')
            alert(alerttwo)
            scroll(0, 0)
        }
    }
    if (nam === 'truck') {
        n = truck_Slots[i]
        truckFreeSlots--
        ntruckslots.innerHTML--
        alerttwo = 'Sorry we dont have engouh Places '
        if (carFreeSlots == 0) {
            document.getElementsByClassName(`truckrunout`)[0].classList.remove('hidden')
            alert(alerttwo)
            scroll(0, 0)
        }
    }
        n.available = 'notAvailble'
        n.currentUser = document.getElementsByClassName(`${nam}inputstatus`)[i].value
        n.entryTime = new Date()
        var entry = n.entryTime.toString().slice(0, 25)
        document.getElementsByClassName(`${nam}freeornot`)[i].innerHTML = n.available
        document.getElementsByClassName(`${nam}username`)[i].innerHTML = n.currentUser
        document.getElementsByClassName(`${nam}date`)[i].innerHTML = entry


        if (nam.available == 'available') {
            document.getElementsByClassName(`${nam}freeornot`)[i].innerHTML = 'available'

        }
        else {
            document.getElementsByClassName(`${nam}freeornot`)[i].innerHTML = 'notAvailable'
            document.getElementsByClassName(`${nam}slotstatus`)[i].classList.add('hidden')
            document.getElementsByClassName(`${nam}leave`)[i].classList.remove('hidden')
        }
        if (document.getElementsByClassName(`${nam}freeornot`)[i].innerHTML === 'notAvailable') {
            document.getElementsByClassName(`${nam}inputstatus`)[i].classList.add('hidden')
        }

    }
}


function leave(i, nam) {

    if (nam === 'car') {
        n = car_Slots[i]
        carFreeSlots++
        ncarslots.innerHTML++
        if (carFreeSlots > 0) {
            document.getElementsByClassName('carrunout')[0].classList.add('hidden')
        }
        let tickett = document.getElementById('ticket')
        tickett.scrollIntoView()
    }
    if (nam === 'moto') {
        n = moto_Slots[i]
        motoFreeSlots++
        nmotoslots.innerHTML++
        if (motoFreeSlots > 0) {
            document.getElementsByClassName('runout')[0].classList.add('hidden')
        }
        let tickett = document.getElementById('mototicket')
        tickett.scrollIntoView()
    }
    if (nam === 'truck') {
        n = truck_Slots[i]
        truckFreeSlots++
        ntruckslots.innerHTML++
        if (truckFreeSlots > 0) {
            document.getElementsByClassName('truckrunout')[0].classList.add('hidden')
        }
        let tickett = document.getElementById('truckticket')
        tickett.scrollIntoView()
    }

    n.endTime = new Date()
    estimatedtime = n.endTime - n.entryTime
    n.available = 'available'
    document.getElementsByClassName(nam + 'freeornot')[i].innerHTML = 'available'
    document.getElementsByClassName(nam + 'username')[i].innerHTML = null
    document.getElementsByClassName(nam + 'date')[i].innerHTML = null
    seconds = Math.floor((estimatedtime / 1000) % 60),
        minutes = Math.floor((estimatedtime / (1000 * 60)) % 60),
        hours = Math.floor((estimatedtime / (1000 * 60 * 60)) % 24);
    var duration = `You Stayed here ${hours} hours and ${minutes} minutes and ${seconds} seconds`;
    let Price = Math.floor(hours * pricePerHour);
    document.getElementsByClassName(nam + 'slotstatus')[i].classList.remove('hidden')
    document.getElementsByClassName(nam + 'leave')[i].classList.add('hidden')
    document.getElementsByClassName(nam + 'inputstatus')[i].classList.remove('hidden')
    document.getElementsByClassName(nam + 'inputstatus')[i].value='';
    var newTicket = new ticket(n.currentUser, duration, Price)
    tickets.push(newTicket)
    clientTicketName = document.getElementById(nam + 'clientname')
    ticketDuration = document.getElementById(nam + 'duration')
    ticketprice = document.getElementById(nam + 'price')
    var j = tickets.length
    clientTicketName.innerHTML = tickets[j - 1].client
    ticketDuration.innerHTML = tickets[j - 1].duration
    ticketprice.innerHTML = tickets[j - 1].price + entryprice
    n.currentUser = null
 

}
document.getElementsByClassName('title')[0].addEventListener('click', function () {
    this.classList.add('backcolor')
    document.getElementsByClassName('title')[1].classList.remove('backcolor')
    document.getElementsByClassName('title')[2].classList.remove('backcolor')
    document.getElementsByClassName('MotoDiv')[0].classList.remove('hidden')
    document.getElementsByClassName('CarDiv')[0].classList.add('hidden')
    document.getElementsByClassName('truckDiv')[0].classList.add('hidden')
})

////////////////////////////////////////////public//////////////////////////////////////////////////////
document.getElementsByClassName('title')[1].addEventListener('click', function () {
    this.classList.add('backcolor')
    document.getElementsByClassName('title')[0].classList.remove('backcolor')
    document.getElementsByClassName('title')[2].classList.remove('backcolor')
    document.getElementsByClassName('MotoDiv')[0].classList.add('hidden')
    document.getElementsByClassName('CarDiv')[0].classList.remove('hidden')
    document.getElementsByClassName('truckDiv')[0].classList.add('hidden')
})
document.getElementsByClassName('title')[2].addEventListener('click', function () {
    this.classList.add('backcolor')
    document.getElementsByClassName('title')[1].classList.remove('backcolor')
    document.getElementsByClassName('title')[0].classList.remove('backcolor')
    document.getElementsByClassName('MotoDiv')[0].classList.add('hidden')
    document.getElementsByClassName('CarDiv')[0].classList.add('hidden')
    document.getElementsByClassName('truckDiv')[0].classList.remove('hidden')

})
document.getElementsByClassName('checkforextra')[1].addEventListener('click', function () {
    let foundedPlaces = truck_Slots.filter(x => x.available == 'available').length
    if (foundedPlaces > 0) {
        document.getElementsByClassName('checkresult')[1].innerHTML = `Congratulations we found ${foundedPlaces} places in truck parking area`
    }
    if (foundedPlaces == 0) {
        document.getElementsByClassName('checkresult')[1].innerHTML = `Sorry we didnt find any place in truck area `;
    }

})
document.getElementsByClassName('checkforextra')[0].addEventListener('click', function () {
    let foundedPlacesInCars = car_Slots.filter(x => x.available == 'available').length
    let foundedPlacesInTrucks = truck_Slots.filter(x => x.available == 'available').length
    if (foundedPlacesInCars > 0) {
        document.getElementsByClassName('checkresult')[0].innerHTML = `Congratulations we found ${foundedPlacesInCars} places in cars parking area`
    }
    if (foundedPlacesInCars == 0 && foundedPlacesInTrucks > 0) {
        document.getElementsByClassName('checkresult')[0].innerHTML = `Congratulations we found ${foundedPlacesInTrucks} places in trucks parking area`;
    }
    if (foundedPlacesInCars == 0 && foundedPlacesInTrucks == 0) {
        document.getElementsByClassName('checkresult')[0].innerHTML = `Sorry we dont find any place in cars area or truks area `
    }
})
function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
document.getElementsByClassName('searchbutton')[0].addEventListener('click', function () {
    let searchInputValue = document.getElementsByClassName('searchinput')[0].value
    if(document.getElementsByClassName('searchinput')[0].value==0){
        alert('Sorry you should write an existing client')
    }else{
    if (document.getElementsByClassName('title')[1].classList.contains('backcolor')) {
        searchResult = car_Slots.find(x => x.currentUser === searchInputValue).id
        let selected = document.getElementsByClassName('s')[searchResult - 1]
        selected.scrollIntoView();
    }
    if (document.getElementsByClassName('title')[0].classList.contains('backcolor')) {
        let searchResultmoto = moto_Slots.find(x => x.currentUser === searchInputValue).id
        let selectedmoto = document.getElementsByClassName('m')[searchResultmoto - 1]
        selectedmoto.scrollIntoView();
    }
    if (document.getElementsByClassName('title')[2].classList.contains('backcolor')) {
        let searchResulttruck = truck_Slots.find(x => x.currentUser === searchInputValue).id
        let selectedtruck = document.getElementsByClassName('t')[searchResulttruck - 1]
        selectedtruck.scrollIntoView();
    }

}})
////////////////////////////////////////end public/////////////////////////////////////////////////////////////

