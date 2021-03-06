/*
*  Copyright (C) 2010-2013 VMware, Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*     http://www.apache.org/licenses/LICENSE-2.0
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
*/
dojo.declare("Main", wm.Page, {
"preferredDevice": "desktop",
"i18n": true,
start: function() {
this.loadingDialog1.containerWidget.setAutoScroll(false);
this.loadingDialog1.containerWidget.setMargin("0,0,0,60")
},
downloadAndInstallServiceVarSuccess: function(inSender, inDeprecated) {
try {
app.toastSuccess("Installation successful");
window.setTimeout(function() {window.location = window.pathname = "/wavemaker/";},1600);
} catch(e) {
console.error('ERROR IN downloadAndInstallServiceVarSuccess: ' + e);
}
},
downloadAndInstallServiceVarError: function(inSender, inError) {
try {
if (inError.message.match(/timed out/i)) {
this.bypassFirewallLabel.hide();
this.label2.show();
this.fileUploadLayer.activate();
} else if (inError.message.match(/permissions/i) || inError.message.match(/access is denied/i)) {
this.permissionsLayer.activate();
}
} catch(e) {
console.error('ERROR IN downloadAndInstallServiceVarError: ' + e);
}
},
manualLabelClick: function(inSender, inEvent) {
try {
this.bypassFirewallLabel.show();
this.label2.hide();
this.fileUploadLayer.activate();
} catch(e) {
console.error('ERROR IN manualLabelClick: ' + e);
}
},
autoLabelClick: function(inSender, inEvent) {
try {
this.manualLabelClick(inSender, inEvent);
} catch(e) {
console.error('ERROR IN manualLabel1Click: ' + e);
}
},
dojoFileUpload1Success: function(inSender, fileList) {
try {
this.downloadAndInstallServiceVarSuccess(inSender);
} catch(e) {
console.error('ERROR IN dojoFileUpload1Success: ' + e);
}
},
downloadZipButtonClick: function(inSender) {
try {
var iframe = dojo.byId("downloadFrame");
if (iframe) iframe.parentNode.removeChild(iframe);
iframe = document.createElement("iframe");
dojo.attr(iframe, {id: "downloadFrame",
name: "downloadFrame",
src: "https://github.com/wavemaker/WaveMaker-LGPL-Resources-6-4/raw/6.6/repo.zip"});
dojo.style(iframe, {top: "1px",
left: "1px",
width: "1px",
height: "1px",
visibility: "hidden"});
dojo.body().appendChild(iframe);
} catch(e) {
console.error('ERROR IN downloadZipButtonClick: ' + e);
}
},
dojoFileUpload1Error: function(inSender, inErrorMsg) {
try {
this.downloadAndInstallServiceVarError(inSender,{message:inErrorMsg});
} catch(e) {
console.error('ERROR IN dojoFileUpload1Error: ' + e);
}
},
licenseCheckbox1Change: function(inSender, inDisplayValue, inDataValue, inSetByCode) {
if (inSender.getChecked()) {
app.alert("Some features of WaveMaker are not available without the System Dependency Bundle installed.  Your WaveMaker Studio behavior will be limited until the System Dependency Bundle is installed.");
app.alertDialog.button1.addUserClass("StudioButton");
}
},
_end: 0
});

Main.widgets = {
downloadAndInstallServiceVar: ["wm.ServiceVariable", {"operation":"DownloadPackages","service":"InstallService"}, {"onError":"downloadAndInstallServiceVarError","onSuccess":"downloadAndInstallServiceVarSuccess"}, {
input: ["wm.ServiceInput", {"type":"DownloadPackagesInputs"}, {}]
}],
gotoMainLayer: ["wm.NavigationCall", {}, {}, {
input: ["wm.ServiceInput", {"type":"gotoLayerInputs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"source":"layer1","targetProperty":"layer"}, {}]
}]
}]
}],
loadingDialog1: ["wm.LoadingDialog", {"caption":"Installing","captionWidth":"200px"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"downloadAndInstallServiceVar","targetProperty":"serviceVariableToTrack"}, {}],
wire1: ["wm.Wire", {"expression":undefined,"source":"downloadButton","targetProperty":"widgetToCover"}, {}]
}]
}],
layoutBox: ["wm.Layout", {"horizontalAlign":"center"}, {}, {
panel5: ["wm.Panel", {"_classes":{"domNode":["wm_Attribution_new"]},"height":"48px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"266px"}, {}],
loginMainPanel: ["wm.Panel", {"height":"100%","horizontalAlign":"center","padding":"20","verticalAlign":"middle","width":"100%"}, {}, {
wmTitle: ["wm.Label", {"_classes":{"domNode":["wm_FontSizePx_14px","wm_TextDecoration_Bold"]},"align":"center","caption":"Complete Installation","height":"29px","padding":"4","styles":{"color":"#ffffff"},"width":"350px"}, {}, {
format: ["wm.DataFormatter", {}, {}]
}],
loginInputPanel: ["wm.EmphasizedContentPanel", {"_classes":{"domNode":["wm_BorderTopStyle_Curved8px","wm_BorderBottomStyle_Curved8px"]},"border":"2","height":"350px","horizontalAlign":"center","verticalAlign":"center","width":"948px"}, {}, {
layers1: ["wm.Layers", {"margin":"20","transition":"fade"}, {}, {
layer1: ["wm.Layer", {"borderColor":"","caption":"layer1","horizontalAlign":"right","verticalAlign":"top"}, {}, {
html2: ["wm.Html", {"autoScroll":false,"height":"119px","html":"<p>NOTE: If it takes more than a minute for the install button to run, click on \"Proxy Problems?\" next to the Download button.</p><p>WaveMaker has identified missing system requirements.  These dependencies can be resolved by downloading the WaveMaker System Requirements Bundle.  The WaveMaker System Requirements Bundle includes open source packages.  Your use of the WaveMaker System Requirements Bundle is subject to open source license(s). \n</p><p>\n<a target=\"_blank\" href=\"https://raw.github.com/wavemaker/WaveMaker-LGPL-Resources-6-4/6.6/license.txt\">View Licenses</a>\n</p>\n","margin":"0,20","minDesktopHeight":15}, {}],
panel6: ["wm.Panel", {"height":"100%","horizontalAlign":"left","margin":"0,0,0,80","verticalAlign":"middle","width":"100%"}, {}, {
licenseCheckbox: ["wm.RadioButton", {"_classes":{"domNode":["StudioEditor"]},"caption":"I accept these licenses","captionAlign":"left","captionPosition":"right","captionSize":"100%","checkedValue":"yes","desktopHeight":"35px","displayValue":"","groupValue":true,"height":"35px","radioGroup":"license","width":"100%"}, {}],
licenseCheckbox1: ["wm.RadioButton", {"_classes":{"domNode":["StudioEditor"]},"caption":"I do not accept these licenses","captionAlign":"left","captionPosition":"right","captionSize":"100%","checkedValue":"no","desktopHeight":"35px","displayValue":"","groupValue":true,"height":"35px","radioGroup":"license","width":"100%"}, {"onchange":"licenseCheckbox1Change"}]
}],
panel3: ["wm.Panel", {"height":"48px","horizontalAlign":"center","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":"!${licenseCheckbox.checked}","targetProperty":"disabled"}, {}]
}],
spacer1: ["wm.Spacer", {"height":"48px","width":"328px"}, {}],
downloadButton: ["wm.Button", {"_classes":{"domNode":["StudioButton"]},"caption":"Download and Install","desktopHeight":"34px","height":"34px","margin":"4","width":"200px"}, {"onclick":"downloadAndInstallServiceVar"}],
manualLabel: ["wm.Label", {"_classes":{"domNode":["wm_FontColor_White"]},"align":"right","caption":"Proxy Problems?","link":"#","padding":"4","width":"100%"}, {"onclick":"manualLabelClick"}, {
format: ["wm.DataFormatter", {}, {}]
}]
}]
}],
fileUploadLayer: ["wm.Layer", {"borderColor":"","caption":"layer2","horizontalAlign":"left","verticalAlign":"top"}, {}, {
label2: ["wm.Label", {"border":"2","borderColor":"#ff0000","caption":"There is a connection problem.  Typically this means you are either not connected to the network or there is a firewall blocking access.  To work around firewall issues, please use the buttons below to complete installation","height":"54px","padding":"4","singleLine":false,"width":"100%"}, {}, {
format: ["wm.DataFormatter", {}, {}]
}],
bypassFirewallLabel: ["wm.Label", {"caption":"If firewalls are keeping the installation from completing, you can use the buttons below to bypass these problems","padding":"4","showing":false,"width":"100%"}, {}, {
format: ["wm.DataFormatter", {}, {}]
}],
panel1: ["wm.Panel", {"height":"40px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
label3: ["wm.Label", {"caption":"Step 1: Download the zip file","height":"100%","padding":"4","width":"100%"}, {}, {
format: ["wm.DataFormatter", {}, {}]
}],
downloadZipButton: ["wm.Button", {"_classes":{"domNode":["StudioButton"]},"caption":"Download","margin":"4","width":"130px"}, {"onclick":"downloadZipButtonClick"}]
}],
panel2: ["wm.Panel", {"height":"40px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
label4: ["wm.Label", {"caption":"Step 2: Upload the zip into studio","height":"100%","padding":"4","width":"100%"}, {}, {
format: ["wm.DataFormatter", {}, {}]
}],
dojoFileUpload1: ["wm.DojoFileUpload", {"_classes":{"domNode":["StudioButton"]},"border":"1","borderColor":"#ABB8CF","height":"100%","margin":"4","operation":"uploadPackage","service":"InstallService","useList":false,"width":"130px"}, {"onError":"dojoFileUpload1Error","onSuccess":"dojoFileUpload1Success"}, {
input1: ["wm.ServiceInput", {"type":"uploadPackageInputs"}, {}],
input2: ["wm.ServiceInput", {"type":"uploadPackageInputs"}, {}],
input3: ["wm.ServiceInput", {"type":"uploadPackageInputs"}, {}],
input: ["wm.ServiceInput", {"type":"uploadPackageInputs"}, {}]
}]
}],
panel4: ["wm.Panel", {"height":"100%","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"bottom","width":"100%"}, {}, {
autoLabel: ["wm.Label", {"align":"left","caption":"Retry automated install?","link":"#","padding":"4","width":"100%"}, {"onclick":"gotoMainLayer"}, {
format: ["wm.DataFormatter", {}, {}]
}]
}]
}],
permissionsLayer: ["wm.Layer", {"borderColor":"","caption":"layer2","horizontalAlign":"right","verticalAlign":"top"}, {}, {
html1: ["wm.Html", {"_classes":{"domNode":["wm_BackgroundColor_LightGray","wm_FontColor_Black"]},"height":"100%","html":"Unable to upload this file; this typically means that your system requires additional permissions to install. You can install these files yourself into studio/WEB-INF/lib.  For instructions go to <a class=\"wm_FontColor_Black\" href=\"#\" onclick=\"window.open('http://dev.wavemaker.com/wiki/bin/ThirdPartyJars')\">Installing Jars</a> on the wiki","minDesktopHeight":15,"padding":"10"}, {}],
button1: ["wm.Button", {"_classes":{"domNode":["StudioButton"]},"caption":"Try Again","margin":"4","width":"107px"}, {"onclick":"layer1"}]
}]
}]
}]
}]
}]
};

Main.prototype._cssText = '.Main .Main-loginErrorMsg {\
font-size: 12px; color: red\
}\
body.tundra .Main .wmlayout .Main-loginInputPanel {\
background-color: #424a5a;\
color: white;\
}\
body.tundra .Main .wmlayout .Main-loginInputPanel a,\
body.tundra .Main .wmlayout .Main-loginInputPanel a:visited {\
color: white;\
}\
body.tundra .Main .Main-layoutBox.wmlayout {\
background: -webkit-gradient(linear, left top, left bottom, from(#444444), to(#9EA6B3));\
background: -moz-linear-gradient(top,  #444444,  #9EA6B3);\
filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr="#444444", endColorstr="#9EA6B3");\
}\
body.tundra .Main .wmlayout .Main-loginInputPanel .Main-html1,\
body.tundra .Main .wmlayout .Main-loginInputPanel .Main-html1 a,\
body.tundra .Main .wmlayout .Main-loginInputPanel .Main-html1 a:visited {\
color: black !important;\
}\
body.tundra .Main .wmlayout .Main-licenseHtml {\
white-space: pre-wrap;\
}\
.wmdialog  .dialogfooter {\
background: -webkit-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
background: -moz-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
background: -o-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
background: -ms-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#798597", endColorstr="#636F80",GradientType=0);\
padding: 4px;\
}\
.dialogtitlebar {\
background: -webkit-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
background: -moz-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
background: -o-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
background: -ms-linear-gradient(top, #798597 0%,#636F80 50%,#636F80 100%);\
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#798597", endColorstr="#636F80",GradientType=0);\
color: #FFF;\
font-size: 120%;\
text-align: center;\
}\
';
Main.prototype._htmlText = '<div id="sample">Sample Markup</div>\
';