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

            alert('Vendor ttl : ' + this.timeToLive.toString() +
                '  Vendor rate : ' + this.rate.toString() +
                '  Vendor Max Limit : ' + this.maxLimit.toString() +
                '  Vendor Min Limit : ' + this.minLimit.toString()
            );
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

            alert('Customer ttl : ' + this.timeToLive.toString() +
                ' Customer rate : ' + this.rate.toString() +
                ' Customer Amount : ' + this.Amount.toString() +
                '*****************' +
                ' Vendor rate : ' + this.rate.toString() +
                '  Vendor Max Limit : ' + this.maxLimit.toString() +
                '  Vendor Min Limit : ' + this.minLimit.toString()
            );
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
   

    vo.createOffer(vo.rate, vo.timeToLive, undefined, vo.minLimit, vo.maxLimit);

    //ShowVendorPublicOffer(vo.firstCurrency, vo.secondCurrency, vo.rate, vo.marketRate, vo.minLimit, vo.maxLimit, vo.timeToLive);
    ShowVendorPublicOffer(vo);
   
    alert('before bid');

    (<HTMLInputElement>document.getElementById("co")).onclick = function () {
        document.title = "Bidding";
       
        var customerRate = 0.145;
        var cAmount = 369;
        var cttl = 7200;

        (<HTMLInputElement>document.getElementById("cmrate")).value = marketrate;
        (<HTMLInputElement>document.getElementById("crate")).value = customerRate.toString();
        (<HTMLInputElement>document.getElementById("camount")).value = cAmount.toString();;
        (<HTMLInputElement>document.getElementById("cttl")).value = cttl.toString();
    };

   
   //Bid(369, .145, 7200);

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

function Bid(amount, rate, ttl) {
    document.title = "Bidding";
    (<HTMLInputElement>document.getElementById("crate")).value = rate
    (<HTMLInputElement>document.getElementById("camount")).value = amount;
    (<HTMLInputElement>document.getElementById("cttl")).value = ttl;
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
    
