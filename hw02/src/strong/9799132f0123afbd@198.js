function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _2(md){return(
md`1. 以 bar chart 呈現每個星座的人數，用顏色表示性別
2. X軸為各個星座的名稱(須為中文)，Y軸為人數
3. 必須包含sign，格式如範例圖`
)}

function _data(FileAttachment){return(
FileAttachment("data@2.json").json()
)}

function _yCounts(){return(
[]
)}

function _constellations(data){return(
data.map(item => item.Constellation)
)}

function _constellationName(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _8(yCounts,constellations,data)
{
  yCounts.length = 0; //將yCounts清空
  var minConstellation = Math.min(...constellations); //最早Constellation
  var maxConstellation = Math.max(...constellations); //最晚Constellation

 
  for (var y=0; y<=11; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    //yCounts.push({constellation:constellation[y], gender:"male", count:0}); 
     yCounts.push({constellation:y, gender:"male", count:0}); 
    //Object包含：1. 星座，2.男性，3.人數(設為0)
    //yCounts.push({constellation:constellation[y], gender:"female", count:0}); 
    yCounts.push({constellation:y, gender:"female", count:0});
    //Object包含：1. 星座，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = x.Constellation*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個Constellation的人
  })
  return yCounts
}


function _9(Plot,yCounts,constellationName){return(
Plot.plot({
grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "constellation", y: "count", tip: true , fill:"gender",title: (d) => `Count:${d.count}\nConstellation:${constellationName[d.constellation]}\ngender:${d.gender}` }),
    Plot.axisX({
      tickFormat: d => {
        return constellationName[d]; 
      },
    }),
  ]
})
)}

function _10(md){return(
md`Strong baseline -2 (1pt)
1. 以 histogram 呈現每個星座的人數，用顏色表示性別
2. X軸為各個星座的名稱(須為中文)，Y軸為人數
3. 必須包含sign，格式如範例圖
`
)}

function _14(Plot,data,constellationName){return(
Plot.plot({  
  width: 800,
	y: {grid: true, label: "count"},  
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true, 
                                             title: (d) => `Constellation:${constellationName[d.Constellation]}\ngender:${d.Gender}`,
                                               },)),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0 }),
    Plot.axisX({
      tickFormat: d => {
        return constellationName[d]; 
      },
    }),
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data@2.json", {url: new URL("../data.json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("constellations")).define("constellations", ["data"], _constellations);
  main.variable(observer("constellationName")).define("constellationName", _constellationName);
  main.variable(observer()).define(["yCounts","constellations","data"], _8);
  main.variable(observer()).define(["Plot","yCounts","constellationName"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Plot","data","constellationName"], _14);
  return main;
}
