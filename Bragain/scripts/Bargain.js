var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path = "/scripts/jquery-2.2.3.js"/>
var surfaceCount = 2;
var panelCount = 2;
var itemCount = 2;
var marketrate = 0.36;
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
    //vo.createOffer(vo.rate, vo.timeToLive, undefined, vo.minLimit, vo.maxLimit);
    //ShowVendorPublicOffer(vo.firstCurrency, vo.secondCurrency, vo.rate, vo.marketRate, vo.minLimit, vo.maxLimit, vo.timeToLive);
    //ShowVendorPublicOffer(vo);
    //alert('before bid');
    document.getElementById("cs").onclick = function () {
        Blurt();
        CreateCommerceSurface(String(surfaceCount));
        alert('Commerce surface');
    };
    //vendor offer
    document.getElementById("pb").onclick = function () {
        //Blurt();
        //CreatePanelItem(panelCount, itemCount, String(surfaceCount));
        PopulateVendorOffer(21, vo);
    };
    //Customer offer
    document.getElementById("co").onclick = function () {
        //Blurt();
        //CreatePanelItem(panelCount, itemCount, String(surfaceCount));
        PopulateCustomerOffer(22, vo);
    };
    //Bid(369, .145, 7200);
};
function PopulateVendorOfferT(itemid, vo) {
    var i = String(itemid);
    document.getElementById("offerpanelelementname" + i).textContent = "Vendor-" + i;
    document.getElementById("firstcurrency" + i).value = vo.firstCurrency;
    document.getElementById("secondcurrency" + i).value = vo.secondCurrency;
    document.getElementById("rate" + i).textContent = vo.rate.toString();
    document.getElementById("amount" + i).textContent = "";
    document.getElementById("marketrate" + i).textContent = marketrate.toString();
    document.getElementById("minlimit" + i).textContent = vo.minLimit.toString();
    document.getElementById("maxlimit" + i).textContent = vo.maxLimit.toString();
    document.getElementById("TimeToLive" + i).textContent = vo.timeToLive.toString();
}
;
function Blurt() {
    alert("Working");
}
;
function ResultToggle() {
    var toggleButton = document.getElementById('#toggleButton');
    var panel = document.getElementById('#example');
    toggleButton.onclick = function () {
        panel.hidden = true;
    };
}
;
function PopulateVendorOffer(itemid, vo) {
    var i = String(itemid);
    document.getElementById("offerpanelelementname" + i).textContent = "Vendor-" + i;
    document.getElementById("firstcurrency" + i).textContent = vo.firstCurrency;
    document.getElementById("secondcurrency" + i).textContent = vo.secondCurrency;
    document.getElementById("rate" + i).textContent = vo.rate.toString();
    document.getElementById("amount" + i).textContent = "";
    document.getElementById("marketrate" + i).textContent = marketrate.toString();
    document.getElementById("minlimit" + i).textContent = vo.minLimit.toString();
    document.getElementById("maxlimit" + i).textContent = vo.maxLimit.toString();
    document.getElementById("TimeToLive" + i).textContent = vo.timeToLive.toString();
}
;
function PopulateCustomerOffer(itemid, vo) {
    var i = String(itemid);
    var fc = 'Bitcoin';
    var sc = 'Ethereum';
    var offerrate = 0.34;
    var customerRate = 0.145;
    var cAmount = 369;
    var cttl = 7200;
    document.getElementById("offerpanelelementname" + i).textContent = "Customer-" + i;
    document.getElementById("firstcurrency" + i).textContent = vo.firstCurrency;
    document.getElementById("secondcurrency" + i).textContent = vo.secondCurrency;
    document.getElementById("rate" + i).textContent = customerRate.toString();
    document.getElementById("amount" + i).textContent = cAmount.toString();
    document.getElementById("marketrate" + i).textContent = marketrate.toString();
    document.getElementById("minlimit" + i).textContent = vo.minLimit.toString();
    document.getElementById("maxlimit" + i).textContent = vo.maxLimit.toString();
    document.getElementById("TimeToLive" + i).textContent = cttl.toString();
}
;
function CreateCommerceSurface(surfaceid) {
    surfaceCount++;
    //var html = document.createElement(' <div id ="surface' + surfaceid + '"class="commercesurface"></div>');
    var html = document.createElement(' <div id ="surface1"class="commercesurface"></div>');
    document.getElementById("main").appendChild(html);
}
;
function CreatePanelItem(panelid, itemid, surfaceid) {
    var p = String(panelid);
    var i = String(itemid);
    var html = '<div id="offerpanel" class="offerpanel" >'
        + '< div id= "offer' + p + ' " class="offerpanelitem" >' +
        +'< div id="offerpanelelementname' + p + i + '" class="offerpanelelementname" > Vendor < /div>' +
        +'< div id= "firstcurrency' + p + i + '" class="offerpanelelement" > </div>' +
        +'< div id= "secondcurrency' + p + i + '" class="offerpanelelement" > </div>' +
        +'< div id= "rate' + p + i + '" class="offerpanelelement" > </div>' +
        +'< div id= "amount' + p + i + '" class="offerpanelelement" > </div>' +
        +'< div id= "marketrate' + p + i + '" class="offerpanelelement" > </div>' +
        +'< div id= "minlimit' + p + i + '" class="offerpanelelement" > </div>' +
        +'< div id= "maxlimit' + p + i + '" class="offerpanelelement" > </div>' +
        +'< div id= "TimeToLive' + p + i + '" class="offerpanelelement" > </div>' +
        +'< /div>'
        + '< /div>';
    var child = document.createElement(html);
    document.getElementById(surfaceid).appendChild(child);
    panelCount++;
    itemCount++;
}
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
function Bid(marketrate, amount, rate, ttl) {
    document.title = "Bidding";
    document.getElementById("cmrate").value = marketrate.toString();
    document.getElementById("crate").value = rate.toString();
    document.getElementById("camount").value = amount.toString();
    document.getElementById("cttl").value = ttl.toString();
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
