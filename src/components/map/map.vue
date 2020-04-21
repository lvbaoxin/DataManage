<template>
	<div style="position:relative;">
		<div v-if="streetList" class="map" id="container"></div>
		<el-button v-show="showreturn" class="returnBtn" plain icon="el-icon-arrow-left" @click="backmap">返回</el-button>
		<div class="showBtn">
			<el-button size="small" class='showDayMap' @click='mapSwitch'>{{btnText}}</el-button>
		</div>
	</div>
</template>
<script>
	export default {

		data() {
			return {
				map: null,
				btnText:"切换卫星地图",
				Highlay:null,
				isShowHighlayer:false,
				polygonList: [],
				streetList: [

				],
				secondClick: false,
				showreturn: false,
				colorArr: ["#ee92a9", "#c0afdc", "#c1e5e6", "#bfaedb", "#e4dfa7", "#ee92a9", "#e4dfa7", "#c0afdc", "#c1e5e6",
					"#bfaedb", "#ee92a9", "#c0afdc", "#c1e5e6", "#bfaedb", "#e4dfa7", "#ee92a9", "#e4dfa7", "#c0afdc", "#c1e5e6",
					"#bfaedb", "#ee92a9", "#c0afdc", "#c1e5e6", "#bfaedb", "#e4dfa7", "#ee92a9", "#e4dfa7", "#c0afdc", "#c1e5e6",
					"#bfaedb", "#ee92a9", "#c0afdc", "#c1e5e6", "#bfaedb", "#e4dfa7", "#ee92a9", "#e4dfa7", "#c0afdc", "#c1e5e6",
					"#bfaedb", "#ee92a9", "#c0afdc", "#c1e5e6", "#bfaedb", "#e4dfa7", "#ee92a9", "#e4dfa7", "#c0afdc", "#c1e5e6",
					"#bfaedb", "#ee92a9", "#c0afdc", "#c1e5e6", "#bfaedb", "#e4dfa7", "#ee92a9", "#e4dfa7", "#c0afdc", "#c1e5e6",
					"#bfaedb", "#ee92a9", "#c0afdc", "#c1e5e6", "#bfaedb", "#e4dfa7", "#ee92a9", "#e4dfa7", "#c0afdc", "#c1e5e6",
					"#bfaedb"
				], //分别为红色、绿色、紫色
				textZoom: [1.8, 1.6, 1, 0.8, 0.6, 0.4, 0.08, 0.06, 0.05, 0.04, 0.03, 0.026, 0.024, 0.022, 0.02, 0.01, 0.01, 0.01,
					0.01
				] //不同等级字体大小

			}
		},
		mounted: function() {
			this.initialize();

		},
		methods: {
			mapSwitch(){ // 地图切换
				var _this = this;
				if(_this.isShowHighlayer){
					_this.map.removeLayer("t");
					_this.btnText='切换卫星地图'
				}else{
					_this.Highlay = new CMMap.TileLayer({
						tileSize:256, //图像大小 
						id:"t",
						getTileUrl:function(x,y,z){ 
							var url='http://221.180.144.111:8089/tileServer?x='+x+'&y='+y+'&z='+z+'&maptype=34&key=y1a1ba00bg21g74g27356131784z932v&number=123456789'
							return url;
						}
					});
					_this.map.addLayer(_this.Highlay);
					_this.btnText='切换矢量地图'
				}
				_this.isShowHighlayer=!_this.isShowHighlayer;
			},
			initialize() {
				var _this = this;
				_this.map = new CMMap.Map("container", {
					view: {
						center: {
							lng: 122.830869,
							lat: 41.079482
						},
						zoom: 18,
						dragEnable: true,
						rotation: 0
					}
				});
				_this.map.plugin(["CMMap.OverLay"], function() {
					if (localStorage.getItem("streetList")) {
						_this.streetList = JSON.parse(localStorage.getItem("streetList"))
						console.log(_this.streetList)
						for (var item in _this.streetList) {
							if (item.streetEdgeCoordinateList) {

								_this.add(item.streetEdgeCoordinateList)
							}
							
							for (var i = 0; i < _this.streetList[item].communityList.length; i++) {

								_this.add(_this.streetList[item].communityList[i], 0, i)
							}
						}
					} else {
						_this.$request.get(_this.GLOBAL.MapUrl, {
							streetId: 120
						}, function(res) {}, function(res) {
							//console.log(res)
							if (res.result == 0) {
								_this.streetList = res.data.streetList;
								localStorage.setItem("streetList", JSON.stringify(_this.streetList))
								for (var item in _this.streetList) {
									if (item.streetEdgeCoordinateList) {
										_this.add(item.streetEdgeCoordinateList)
									}
									for (var i = 0; i < _this.streetList[item].communityList.length; i++) {

										_this.add(_this.streetList[item].communityList[i], 0, i)
									}
								}
							}
						});
					}


				});
				//在地图中添加ToolBar插件
				_this.map.plugin(["CMMap.ToolBar"], function() {
					var toolBar = new CMMap.ToolBar();
					_this.map.addControl(toolBar);
				});
				//加载比例尺插件
				_this.map.plugin(["CMMap.Scale"], function() {
					var scale = new CMMap.Scale();
					_this.map.addControl(scale);
				});
			

			},
			add(data, isChild, index) {
				var _this = this;
				if (data.streetName) {
					data.name = data.streetName
				}

				if (data.communityName) {
					data.name = data.communityName
				}
				var pathsList = []
				if (isChild) {
					for (var k = 0; k < data.list.length; k++) {
						pathsList.push({
							lng: data.list[k].lng,
							lat: data.list[k].lat
						})
					}
				} else {
					for (var k = 0; k < data.communityEdgeCoordinateList.length; k++) {
						pathsList.push({
							lng: data.communityEdgeCoordinateList[k].lng,
							lat: data.communityEdgeCoordinateList[k].lat
						})
					}
				}


				_this.addDistinct({
					extData: {
						text: data.name,
						gridId: data.gridId,
						hpolygonCenter: {
							lat: data.centerLat,
							lng: data.centerLng
						}
					},
					path: pathsList, // 设置线覆盖物路径
					strokeColor: "#456234", // 线颜色
					strokeOpacity: 1, // 线透明度
					strokeWeight: 1, // 线宽
					fillColor: _this.colorArr[index], // 填充色
					fillOpacity: 0.6, // 填充透明度
					strokeStyle: "dashed", // 线样式  dashed
					strokeDasharray: [10, 2, 10] // 补充线样式
				})

			},
			addDistinct(lineArr) {
				var _this = this
				var gridIds = lineArr.extData.gridId ? lineArr.extData.gridId : 0
				var polygon = new CMMap.Polygon({
					map: _this.map,
					extData: {
						data: lineArr.extData,
						gridId: gridIds
					},
					path: lineArr.path, // 设置线覆盖物路径
					strokeColor: lineArr.strokeColor, // 线颜色
					strokeOpacity: lineArr.strokeOpacity, // 线透明度
					strokeWeight: lineArr.strokeWeight, // 线宽
					fillColor: lineArr.fillColor, // 填充色
					fillOpacity: lineArr.fillOpacity, // 填充透明度
					strokeStyle: lineArr.strokeStyle, // 线样式  dashed
					strokeDasharray: lineArr.strokeDasharray // 补充线样式
				});

				//在网格上显示文字  有文字的就是查看
				var pos = lineArr.extData.hpolygonCenter.lat ? lineArr.extData.hpolygonCenter : lineArr.path[0]
				_this.hint({
					map: _this.map,
					text: lineArr.extData.text,
					pos: pos,
					color: "#333",
					gridId: gridIds
				})

				_this.polygonList.push(polygon)

			},
			hint(msg) {
				var _this = this;
				//添加文字
				var marker = new CMMap.Marker({
					map: msg.map,
					position: new CMMap.LngLat(msg.pos.lng, msg.pos.lat),
					offset: new CMMap.Pixel(0, 0),
					clickable: true,
					draggable: false,
					customerId: msg.gridId
				})

				marker.addListener(marker, "click", function(e) {
					if (!_this.secondClick) {
						_this.secondClick = true;
						_this.showreturn = true;
						_this.$emit('mapClick', marker.customerId)
						_this.findGridById(marker.customerId);
					}
					//console.log(marker.customerId);
				});
				marker.addListener(marker, "touchstart", function(e) {
					marker.clickable = false;
					marker.draggable = false;
				});
				marker.addListener(marker, "touchend", function(e) {
					marker.clickable = true;
					marker.draggable = true;
				});
				var txt = msg.text;
				var divcontent = document.createElement("div");
				divcontent.className = "textInfo";
				divcontent.innerText = txt;
				divcontent.style.position = "absolute";
				divcontent.style.color = msg.color;
				divcontent.style.height = "18px";
				divcontent.style.padding = "2px";
				divcontent.style.lineHeight = "18px";
				divcontent.style.whiteSpace = "nowrap";
				divcontent.style.MozUserSelect = "none";
				divcontent.style.fontSize = "24x"
				marker.setContent(divcontent);
			},
			textSize() {},
			findGridById(id) {
				this.map.clearOverlaysByType("polygon");
				this.map.clearOverlaysByType("marker");
				var communityList = this.streetList[0].communityList;
				for (let index = 0; index < communityList.length; index++) {
					if (communityList[index].gridId == id) {
						communityList[index].gridList.forEach((element, indexs) => {
							this.add(element, 1, indexs)
						});
					}
				}
			},
			backmap() {
				var _this = this;
				this.map.clearOverlaysByType("polygon");
				this.map.clearOverlaysByType("marker");
				this.secondClick = false;
				this.showreturn = false
				for (var item in _this.streetList) {
					if (item.streetEdgeCoordinateList) {
						_this.add(item.streetEdgeCoordinateList)
					}
					for (var i = 0; i < _this.streetList[item].communityList.length; i++) {
						_this.add(_this.streetList[item].communityList[i], 0, i)
					}
				}
			}
		}
	}
</script>

<style>
	#container {
		height: 640px;
	}

	.textInfo {
		font-size: 2px !important
	}

	/*返回按钮*/
	.returnBtn {
		position: absolute;
		top: 10px;
		right: 70px !important;
		background: none;
		color: #409EFF;
		border: 1px solid #409EFF;
	}

	.returnBtn:hover {
		background: #409EFF;
		color: #fff;
	}

	.showBtn {
		position: absolute;
		top: 20px;
		left: 80px !important;
	}
</style>
