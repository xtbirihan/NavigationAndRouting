sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
    "sap/base/Log"
], function (BaseController, Log) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.App", {

		onInit: function () {
			Log.setLevel(Log.Level.INFO);

			var oRouter = this.getRouter();

			oRouter.attachBypassed(function (oEvent) {
				var sHash = oEvent.getParameter("hash");
				Log.info("Sorry, but the hash '" + sHash + "' is invalid.", "The resource was not found.");
			});
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName = oEvent.getParameter("name");
				// do something, i.e. send usage statistics to back end
				// in order to improve our app and the user experience (Build-Measure-Learn cycle)
				Log.info("User accessed route " + sRouteName + ", timestamp = " + new Date().getTime());
			});

		}

	});

});

