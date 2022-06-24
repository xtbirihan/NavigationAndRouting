sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
    var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
	return BaseController.extend("sap.ui.demo.nav.controller.employee.Resume", {
        onInit: function () {
            var oRouter = this.getRouter();
            this.getView().setModel(new JSONModel() , "view"); 
            oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this); 
        },

        _onRouteMatched : function (oEvent) {
            var oArgs, oView, oQuery;
            oArgs = oEvent.getParameter("arguments"); 
            oView = this.getView(); 
            var fnSetBusy = function (bBusyIndicator) {
                oView.setBusy(bBusyIndicator); 
            };
            oView.bindElement({
                path:  "/Employees(" + oArgs.employeeId + ")",
                events: {
                     change: this._onBindingChange.bind(this), 
                     dataRequested: fnSetBusy( true ), 
                     dataReceived:  fnSetBusy( false )
                }
            });

            oQuery = oArgs["?query"]; 
            if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1 ) {
                oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);  
                if (oQuery.tab === "Hobbies" || oQuery.tab === "Notes"){
					// the target is either "resumeTabHobbies" or "resumeTabNotes"
					this.getRouter().getTargets().display("resumeTab" + oQuery.tab);
				}
            } else {
                this.getRouter().navTo("employeeResume" , {
                    employeeId: oArgs.employeeId,
                    "?query": {
                        tab: _aValidTabKeys[0]
                    }
                }, true);
            }
        },
        _onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
        onTabSelect: function (oEvent){ 
            var oCtx = this.getView().getBindingContext();
            this.getRouter().navTo("employeeResume", {
				employeeId: oCtx.getProperty("EmployeeID"),
				"?query": {
					tab: oEvent.getParameter("selectedKey")
				}
            }, true );

        }
	});
});