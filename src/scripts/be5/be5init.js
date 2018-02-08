import be5 from './be5';
import bus from './core/bus';
//import documentState from './core/documentState';


const hashChange = function()
{
  console.log(be5.documentName + " - " + document.location.hash);

  be5.url.process(be5.documentName, document.location.hash);
};
// const hashChange = function()
// {
//   const state = documentState.get(be5.documentName);
//   if(state.links === undefined || "#!" + documentState.get(be5.documentName).links.self !== document.location.hash)
//   {
//     console.log(state.links === undefined ? "()" : state.links.self + " -> " + document.location.hash);
//     be5.url.process(be5.documentName, document.location.hash);
//   }
// };

window.addEventListener("hashchange", hashChange, false);

be5.net.request("appInfo", {}, function(data) {
  be5.appInfo = data;
  be5.ui.setTitle();
});

bus.listen('CallDefaultAction', () => {
  be5.net.request('menu/defaultAction', {}, data => {
    be5.url.set(data.arg)
  });
});

be5.net.request('languageSelector', {}, function(data) {
  be5.locale.set(data.selected, data.messages);
  be5.url.process(be5.documentName, document.location.hash);
});
