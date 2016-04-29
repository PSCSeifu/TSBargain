var surfaceCount = 2;
var panelCount = 2;
var itemCount = 2;
var marketrate = 0.36;
interface IOfferOptions {
    //setCustomerBargain(callback: (rate: number, ttl: number, amount?: number) => void): void;
    createOffer(callback: (rate: number, ttl: number, amount?: number, minLimit?: number, maxLimit?: number) => void): void;
}

class IOffer {
    offerId: number;
    parentId: number;
    TypeId: number;
    status: string;
    firstCurrency: string;
    secondCurrency: string;
    rate: number;
    marketRate: number;
    transactionSpeed: string;
    feeRate: number;
    transactionFee: number;
    Amount: number;
    minLimit: number;
    maxLimit: number;
    timeToLive: number;
    bargainLimit: number;
    created: Date;
    modified: Date;
}

class Offer  {
    private _OfferId: number;
    parentId: number;
    TypeId: number;
    status: string;
    firstCurrency: string;
    secondCurrency: string;
    rate: number;
    marketRate: number;
    transactionSpeed: string;
    feeRate: number;
    transactionFee: number;
    Amount: number;
    minLimit: number;
    maxLimit: number;
    timeToLive: number;
    bargainLimit: number;
    private created: Date ;
    private modified: Date;

    constructor(offerId: number, parentId: number, TypeId: number, status: string,
        firstCurrency: string, secondCurrency: string, rate: number, marketRate: number,
        transactionSpeed: string, feeRate: number, transactionFee: number, Amount: number,
        minLimit: number, maxLimit: number, timeToLive: number, bargainLimit: number)
     {
        this._OfferId = offerId;
        this.parentId = parentId;
        this.TypeId = TypeId;
        this.status = status;
        this.firstCurrency = firstCurrency;
        this.secondCurrency = secondCurrency;
        this.rate = rate;
        this.marketRate = marketRate;
        this.transactionSpeed = transactionSpeed;
        this.feeRate = feeRate;
        this.transactionFee = transactionFee;
        this.Amount = Amount;
        this.minLimit = minLimit;
        this.maxLimit = maxLimit;
        this.timeToLive = timeToLive;
        this.bargainLimit = bargainLimit;
    }
    //constructor(options: IOffer) {
    //    this._OfferId = options.offerId;
    //    this.parentId = options.parentId;
    //    this.TypeId = options.TypeId;
    //    this.status = options.status;
    //    this.firstCurrency = options.firstCurrency;
    //    this.secondCurrency = options.secondCurrency;
    //    this.rate = options.rate;
    //    this.marketRate = options.marketRate;
    //    this.transactionSpeed = options.transactionSpeed;
    //    this.feeRate = options.feeRate;
    //    this.transactionFee = options.transactionFee;
    //    this.Amount = options.Amount;
    //    this.minLimit = options.minLimit;
    //    this.maxLimit = options.maxLimit;
    //    this.timeToLive = options.timeToLive;
    //    this.bargainLimit = options.bargainLimit;
    //    this.created = options.created;
    //    this.modified = options.modified;
    //}

    get offerId(): IOffer { return this.offerId; }
    set offerId(value: IOffer) {
        if (value == undefined) throw 'Supply offerid'
        if (value.offerId === 0) {
            this._OfferId = 0;
        }
        else {
            this._OfferId = value.offerId;
        }
    }
}

class VendorOffer extends Offer {

    constructor(vo: Offer, uniqueid :number) {
        super(            uniqueid, vo.parentId, vo.TypeId, vo.status,
            vo.firstCurrency, vo.secondCurrency, vo.rate, vo.marketRate ,
            vo.transactionSpeed, vo.feeRate, vo.transactionFee, vo.Amount ,
            vo.minLimit, vo.maxLimit, vo.timeToLive, vo.bargainLimit );
    }
    createOffer(rate: number, ttl: number, amount?: number, minLimit?: number, maxLimit?: number) {
        if (amount == undefined) {
            this.timeToLive = ttl;
            this.maxLimit = maxLimit;
            this.minLimit = minLimit;
            this.rate = rate;

            //alert('Vendor ttl : ' + this.timeToLive.toString() +
            //    '  Vendor rate : ' + this.rate.toString() +
            //    '  Vendor Max Limit : ' + this.maxLimit.toString() +
            //    '  Vendor Min Limit : ' + this.minLimit.toString()
            //);
        }
        else {
            alert(' Error Amount is defined for Vendor.');
        }
    }
}

class CustomerOffer extends VendorOffer {
    constructor(vo: VendorOffer, amount: number, rate: number, ttl: number) {
        super(vo, 42);
        }
    createOffer(rate: number, ttl: number, amount?: number, minLimit?: number, maxLimit?: number) {
        if (minLimit == undefined) {
            this.timeToLive = ttl;
            this.Amount = amount;
            this.rate = rate;

            this.rate = rate;

            //alert('Customer ttl : ' + this.timeToLive.toString() +
            //    ' Customer rate : ' + this.rate.toString() +
            //    ' Customer Amount : ' + this.Amount.toString() +
            //    '*****************' +
            //    ' Vendor rate : ' + this.rate.toString() +
            //    '  Vendor Max Limit : ' + this.maxLimit.toString() +
            //    '  Vendor Min Limit : ' + this.minLimit.toString()
            //);
        }
        else {
            alert(' Error Min Limit is defined for Customer.');
        }
}
}


window.onload = function () {

    var marketrate = '0.1896';
    var oo = new Offer(0, 1, 2, 'Live', 'Bitcoin', 'Ethereum', 0.25, 0.28, 'medium', 0.1, 0, 0, 0, 500, 3600, 6);
    var vo = new VendorOffer(oo, 1);
    var co = new CustomerOffer(vo, 256, 0.25, 3600);
   

    //vo.createOffer(vo.rate, vo.timeToLive, undefined, vo.minLimit, vo.maxLimit);

    //ShowVendorPublicOffer(vo.firstCurrency, vo.secondCurrency, vo.rate, vo.marketRate, vo.minLimit, vo.maxLimit, vo.timeToLive);
    //ShowVendorPublicOffer(vo);
   
    //alert('before bid');
    (<HTMLInputElement>document.getElementById("cs")).onclick = function () { 
        Blurt();
        CreateCommerceSurface(String(surfaceCount));
        alert('Commerce surface');
    };

    //vendor offer
    (<HTMLInputElement>document.getElementById("pb")).onclick = function () {
        //Blurt();
        //CreatePanelItem(panelCount, itemCount, String(surfaceCount));
        PopulateVendorOffer(21, vo);              
    };

    //Customer offer
    (<HTMLInputElement>document.getElementById("co")).onclick = function () {
        //Blurt();
        //CreatePanelItem(panelCount, itemCount, String(surfaceCount));
        PopulateCustomerOffer(22, vo);       
    };
   //Bid(369, .145, 7200);

}


function PopulateVendorOfferT(itemid: number, vo: VendorOffer) {
    var i = String(itemid);

    (<HTMLInputElement>document.getElementById("offerpanelelementname" + i)).textContent = "Vendor-" + i;
    (<HTMLInputElement>document.getElementById("firstcurrency" + i)).value = vo.firstCurrency;
    (<HTMLInputElement>document.getElementById("secondcurrency" + i)).value = vo.secondCurrency;
    (<HTMLInputElement>document.getElementById("rate" + i)).textContent = vo.rate.toString();
    (<HTMLInputElement>document.getElementById("amount" + i)).textContent = "";
    (<HTMLInputElement>document.getElementById("marketrate" + i)).textContent = marketrate.toString();
    (<HTMLInputElement>document.getElementById("minlimit" + i)).textContent = vo.minLimit.toString();
    (<HTMLInputElement>document.getElementById("maxlimit" + i)).textContent = vo.maxLimit.toString();
    (<HTMLInputElement>document.getElementById("TimeToLive" + i)).textContent = vo.timeToLive.toString();

};

function Blurt() {
    alert("Working");
};

function ResultToggle() {
    var toggleButton = document.getElementById('#toggleButton');
    var panel = document.getElementById('#example');
    toggleButton.onclick = function () {
        panel.hidden = true;
    };
};


function PopulateVendorOffer(itemid: number, vo: VendorOffer) {
    var i = String(itemid);   

    (<HTMLInputElement>document.getElementById("offerpanelelementname" + i)).textContent = "Vendor-" + i;
    (<HTMLInputElement>document.getElementById("firstcurrency" + i)).textContent = vo.firstCurrency;
    (<HTMLInputElement>document.getElementById("secondcurrency" + i)).textContent = vo.secondCurrency;
    (<HTMLInputElement>document.getElementById("rate" + i)).textContent = vo.rate.toString();
    (<HTMLInputElement>document.getElementById("amount" + i)).textContent = "";
    (<HTMLInputElement>document.getElementById("marketrate" + i)).textContent = marketrate.toString();
    (<HTMLInputElement>document.getElementById("minlimit" + i)).textContent = vo.minLimit.toString();
    (<HTMLInputElement>document.getElementById("maxlimit" + i)).textContent = vo.maxLimit.toString();
    (<HTMLInputElement>document.getElementById("TimeToLive" + i)).textContent = vo.timeToLive.toString();

};

function PopulateCustomerOffer(itemid: number, vo: VendorOffer) {

    var i = String(itemid);
    var fc = 'Bitcoin';
    var sc = 'Ethereum';
    var offerrate = 0.34;
    var customerRate = 0.145;
    var cAmount = 369;
    var cttl = 7200;

    (<HTMLInputElement>document.getElementById("offerpanelelementname" + i)).textContent = "Customer-"+i;
    (<HTMLInputElement>document.getElementById("firstcurrency" + i)).textContent = vo.firstCurrency;
    (<HTMLInputElement>document.getElementById("secondcurrency" + i)).textContent = vo.secondCurrency;
    (<HTMLInputElement>document.getElementById("rate" + i)).textContent = customerRate.toString();
    (<HTMLInputElement>document.getElementById("amount" + i)).textContent = cAmount.toString();
    (<HTMLInputElement>document.getElementById("marketrate" + i)).textContent = marketrate.toString();
    (<HTMLInputElement>document.getElementById("minlimit" + i)).textContent = vo.minLimit.toString();
    (<HTMLInputElement>document.getElementById("maxlimit" + i)).textContent = vo.maxLimit.toString();
    (<HTMLInputElement>document.getElementById("TimeToLive" + i)).textContent = cttl.toString();
    
};

function CreateCommerceSurface(surfaceid: string) {
    surfaceCount++;
    //var html = document.createElement(' <div id ="surface' + surfaceid + '"class="commercesurface"></div>');
    var html = document.createElement(' <div id ="surface1"class="commercesurface"></div>');
    <HTMLElement>document.getElementById("main").appendChild(html);
};

function CreatePanelItem(panelid: number, itemid:number,surfaceid:string) {
    var p = String(panelid);
    var i = String(itemid);

    var html = '<div id="offerpanel" class="offerpanel" >'
                 + '< div id= "offer' + p +' " class="offerpanelitem" >' +
                    + '< div id="offerpanelelementname' + p + i +'" class="offerpanelelementname" > Vendor < /div>' +
                    + '< div id= "firstcurrency' + p + i +'" class="offerpanelelement" > </div>' +
                    + '< div id= "secondcurrency' + p + i +'" class="offerpanelelement" > </div>' +
                    + '< div id= "rate' + p + i + '" class="offerpanelelement" > </div>' +
                    + '< div id= "amount' + p + i + '" class="offerpanelelement" > </div>' +
                    + '< div id= "marketrate' + p + i +'" class="offerpanelelement" > </div>' +
                    + '< div id= "minlimit' + p + i +'" class="offerpanelelement" > </div>' +
                    + '< div id= "maxlimit' + p + i +'" class="offerpanelelement" > </div>' + 
                    + '< div id= "TimeToLive' + p + i +'" class="offerpanelelement" > </div>' +
                 + '< /div>'
        + '< /div>'
    var child = document.createElement(html);
    <HTMLElement>document.getElementById(surfaceid).appendChild(child);

    panelCount++;
    itemCount++;
}

function ShowVendorPublicOffer(vo: VendorOffer) {
    document.title = "Changed";
    (<HTMLInputElement>document.getElementById("firstcurrency")).value = vo.firstCurrency;
    (<HTMLInputElement>document.getElementById("secondcurrency")).value = vo.secondCurrency;
    (<HTMLInputElement>document.getElementById("rate")).value = vo.rate.toString();
    (<HTMLInputElement>document.getElementById("marketrate")).value = vo.marketRate.toString();
    (<HTMLInputElement>document.getElementById("minlimit")).value = vo.minLimit.toString();
    (<HTMLInputElement>document.getElementById("maxlimit")).value = vo.maxLimit.toString();
    (<HTMLInputElement>document.getElementById("ttl")).value = vo.timeToLive.toString();

}

function ShowublicOffer(fc,sc,rate,mrate,min,max,ttl) {    
    document.title = "Changed";
    (<HTMLInputElement>document.getElementById("firstcurrency")).value = fc;
    (<HTMLInputElement>document.getElementById("secondcurrency")).value = sc;
    (<HTMLInputElement>document.getElementById("rate")).value = rate;
    (<HTMLInputElement>document.getElementById("marketrate")).value = mrate;
    (<HTMLInputElement>document.getElementById("minlimit")).value = min;
    (<HTMLInputElement>document.getElementById("maxlimit")).value = max;
    (<HTMLInputElement>document.getElementById("ttl")).value = ttl;
    
}

function Bid(marketrate :number,amount : number, rate: number, ttl:number) {
    document.title = "Bidding";
    (<HTMLInputElement>document.getElementById("cmrate")).value = marketrate.toString();
    (<HTMLInputElement>document.getElementById("crate")).value = rate.toString();
    (<HTMLInputElement>document.getElementById("camount")).value = amount.toString();
    (<HTMLInputElement>document.getElementById("cttl")).value = ttl.toString();
}
 

  //offerId : 0,
  //      parentId : 1,
  //      typeId : 2,
  //      firstCurrency : 'BitCoin',
  //      secondCurrency: 'Ehtereum',
  //      rate: 0.25,
  //      marketrate: 0.28,
  //      transactionSpeed: 'medium',
  //      feeRate: 0.1,
  //      transactionFee: 0,
  //      Amount: 125,
  //      minLImit: 0,
  //      maxLimit: 500,
  //      timeToLive: 3600,
  //      bargainLimit :6      
    
