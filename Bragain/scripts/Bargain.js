var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IOffer = (function () {
    function IOffer() {
    }
    return IOffer;
}());
var Offer = (function () {
    function Offer(offerId, parentId, TypeId, status, firstCurrency, secondCurrency, rate, marketRate, transactionSpeed, feeRate, transactionFee, Amount, minLimit, maxLimit, timeToLive, bargainLimit) {
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
    Object.defineProperty(Offer.prototype, "offerId", {
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
        get: function () { return this.offerId; },
        set: function (value) {
            if (value == undefined)
                throw 'Supply offerid';
            if (value.offerId === 0) {
                this._OfferId = 0;
            }
            else {
                this._OfferId = value.offerId;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Offer;
}());
var VendorOffer = (function (_super) {
    __extends(VendorOffer, _super);
    function VendorOffer(vo, uniqueid) {
        _super.call(this, uniqueid, vo.parentId, vo.TypeId, vo.status, vo.firstCurrency, vo.secondCurrency, vo.rate, vo.marketRate, vo.transactionSpeed, vo.feeRate, vo.transactionFee, vo.Amount, vo.minLimit, vo.maxLimit, vo.timeToLive, vo.bargainLimit);
    }
    VendorOffer.prototype.createOffer = function (rate, ttl, amount, minLimit, maxLimit) {
        if (amount == undefined) {
            this.timeToLive = ttl;
            this.maxLimit = maxLimit;
            this.minLimit = minLimit;
            this.rate = rate;
            alert('Vendor ttl : ' + this.timeToLive.toString() +
                '  Vendor rate : ' + this.rate.toString() +
                '  Vendor Max Limit : ' + this.maxLimit.toString() +
                '  Vendor Min Limit : ' + this.minLimit.toString());
        }
        else {
            alert(' Error Amount is defined for Vendor.');
        }
    };
    return VendorOffer;
}(Offer));
var CustomerOffer = (function (_super) {
    __extends(CustomerOffer, _super);
    function CustomerOffer(vo, amount, rate, ttl) {
        _super.call(this, vo, 42);
    }
    CustomerOffer.prototype.createOffer = function (rate, ttl, amount, minLimit, maxLimit) {
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
                '  Vendor Min Limit : ' + this.minLimit.toString());
        }
        else {
            alert(' Error Min Limit is defined for Customer.');
        }
    };
    return CustomerOffer;
}(VendorOffer));
window.onload = function () {
    var marketrate = '0.1896';
    var oo = new Offer(0, 1, 2, 'Live', 'Bitcoin', 'Ethereum', 0.25, 0.28, 'medium', 0.1, 0, 0, 0, 500, 3600, 6);
    var vo = new VendorOffer(oo, 1);
    var co = new CustomerOffer(vo, 256, 0.25, 3600);
    vo.createOffer(vo.rate, vo.timeToLive, undefined, vo.minLimit, vo.maxLimit);
    //ShowVendorPublicOffer(vo.firstCurrency, vo.secondCurrency, vo.rate, vo.marketRate, vo.minLimit, vo.maxLimit, vo.timeToLive);
    ShowVendorPublicOffer(vo);
    alert('before bid');
    document.getElementById("co").onclick = function () {
        document.title = "Bidding";
        var customerRate = 0.145;
        var cAmount = 369;
        var cttl = 7200;
        document.getElementById("cmrate").value = marketrate;
        document.getElementById("crate").value = customerRate.toString();
        document.getElementById("camount").value = cAmount.toString();
        ;
        document.getElementById("cttl").value = cttl.toString();
    };
    //Bid(369, .145, 7200);
};
function ShowVendorPublicOffer(vo) {
    document.title = "Changed";
    document.getElementById("firstcurrency").value = vo.firstCurrency;
    document.getElementById("secondcurrency").value = vo.secondCurrency;
    document.getElementById("rate").value = vo.rate.toString();
    document.getElementById("marketrate").value = vo.marketRate.toString();
    document.getElementById("minlimit").value = vo.minLimit.toString();
    document.getElementById("maxlimit").value = vo.maxLimit.toString();
    document.getElementById("ttl").value = vo.timeToLive.toString();
}
function ShowublicOffer(fc, sc, rate, mrate, min, max, ttl) {
    document.title = "Changed";
    document.getElementById("firstcurrency").value = fc;
    document.getElementById("secondcurrency").value = sc;
    document.getElementById("rate").value = rate;
    document.getElementById("marketrate").value = mrate;
    document.getElementById("minlimit").value = min;
    document.getElementById("maxlimit").value = max;
    document.getElementById("ttl").value = ttl;
}
function Bid(amount, rate, ttl) {
    document.title = "Bidding";
    document.getElementById("crate").value = rate(document.getElementById("camount")).value = amount;
    document.getElementById("cttl").value = ttl;
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
