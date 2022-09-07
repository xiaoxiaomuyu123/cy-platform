/**
 * tab数据
 * 
 * 结构：
 * {
 * 	text:  父tab名称
 *  child: 子tab集合
 * 	{
 * 		text: 	子tab名称
 * 		url: 	子tab对应的html页面相对路径
 * 		selector: 右上角的下拉框内容数组（支持多个select）
 * 		[
 *			{
				name: 选择器对应的key（便于后续传递数据到子页面）
 *				options: 选择器的选项
 *				[
 *					{
 * 						text: 	选项的文字内容
 * 						value: 	选项的值
 * 					},
 * 				]
 * 				...
 * 			},
 * 			...
 * 		]
 * 	}
 * }
 */
let tabList = [{
		text: '年度体检',
		child: [{
				text: '体检概览',
				url: '',
				selector: []
			},
			{
				text: '指标列表',
				url: '',
				selector: []
			},
			{
				text: '指标详情',
				url: '../../pages/annualPhysicalCheck/targetDetail/index.html',
				selector: [{
						name: 'city',
						options: [{
							text: '西安市',
							value: 1
						}],
					},
					{
						name: 'year',
						options: [{
								text: '2020',
								value: '2020'
							},
							{
								text: '2019',
								value: '2019'
							}
						]
					}
				]
			},
			{
				text: '历年指标对比',
				url: '../../pages/annualPhysicalCheck/targetsHistoryCompare/index.html',
				selector: [{
					name: 'city',
					options: [{
						text: '西安市',
						value: 1
					}],
				}, ]
			},
			{
				text: '区域指标对比',
				url: './indexComparison.html',
				selector: [{
						name: 'city',
						options: [{
							text: '西安市',
							value: 1
						}],
					},
					{
						name: 'year',
						options: [{
								text: '2020',
								value: '2020'
							},
							{
								text: '2019',
								value: '2019'
							}
						]
					}
				]
			},
			{
				text: '社会满意度分析',
				url: '',
				selector: []
			}
		]
	},
	{
		text: '体征感知',
		child: []
	},
	{
		text: '智能评估与辅助决策',
		child: [{
				text: '宜居社区综合分析评价',
				url: '',
				selector: []
			},
			{
				text: '重点地区大数据辅助决策',
				url: '',
				selector: []
			},
			{
				text: '街道风貌评价',
				url: '',
				selector: []
			},
			{
				text: '城市建成区识别',
				url: '',
				selector: []
			}
		]
	},
	{
		text: '整改跟踪',
		child: []
	},
	{
		text: '案例库',
		child: []
	}
];

// 当前选中的tab索引值
var currentTab = 0;
// 当前选中的子tab索引值
var currentSubTab = 0;

// 初始化页面
function init() {
	// 初始化父tab
	let tabDiv = document.getElementById('tabList');
	for (let i = 0; i < tabList.length; i++) {
		let tabItem = document.createElement('div');
		tabItem.classList.add('tab-item');
		// 默认选中第一个tab
		if (i == 0) {
			tabItem.classList.add('tab-item-checked');
		}
		tabItem.dataset.index = i;
		tabItem.innerText = tabList[i].text;
		tabDiv.appendChild(tabItem);
		// 监听点击事件
		tabItem.addEventListener('click', function() {
			// 样式切换
			let oldCheckedTab = document.querySelector('.tab-item-checked');
			oldCheckedTab.classList.remove('tab-item-checked');
			currentTab = this.dataset.index;
			this.classList.add('tab-item-checked');
			// 刷新子tab
			refreshSubTab();
		});
	}
	// 初始化子tab
	refreshSubTab();
}

// 刷新 子tab
function refreshSubTab() {
	currentSubTab = 0;
	let subTab = document.getElementById('subTab');
	subTab.innerHTML = '';
	let newSubTab = tabList[currentTab].child;
	for (let i = 0; i < newSubTab.length; i++) {
		let div = document.createElement('div');
		div.classList.add('subtab-item')
		div.dataset.index = i;
		div.innerText = newSubTab[i].text;
		if (i == currentSubTab) {
			div.classList.add('subtab-item-checked');
			document.getElementById('content').src = newSubTab[i].url;
		}
		subTab.appendChild(div);
		// 切换子tab事件监听
		div.addEventListener('click', function() {
			// 样式切换
			let oldCheckedSubtab = document.getElementsByClassName('subtab-item-checked')[0];
			oldCheckedSubtab.classList.remove('subtab-item-checked');
			currentSubTab = this.dataset.index;
			this.classList.add('subtab-item-checked');
			// 加载iframe内容
			document.getElementById('content').src = tabList[currentTab].child[currentSubTab].url;
			loadSelector();
		})
		loadSelector();
	}
}

// 初始化右上角下拉框
function loadSelector() {
	let newSubTab = tabList[currentTab].child;
	let rightSelector = document.getElementById('rightSelector');
	rightSelector.innerHTML = '';
	if (newSubTab[currentSubTab].selector.length == 0) return;
	// 初始化下拉框数据
	let selectList = newSubTab[currentSubTab].selector;
	for (let i = 0; i < selectList.length; i++) {
		// 生成select
		let div = document.createElement('div');
		div.classList.add('selector-div');
		div.dataset.index = i;
		// 下拉icon
		let img = document.createElement('img');
		img.src = 'img/common/arrow-down.png';
		img.classList.add('icon-24');
		// select选中的文字
		let select = document.createElement('div');
		select.classList.add('select-text');
		select.name = selectList[i].name;
		select.dataset.index = i;
		// 生成option
		let optionDiv = document.createElement('div');
		optionDiv.classList.add('selector-option');
		optionDiv.id = 'option' + i;
		optionDiv.style.display = 'none';
		let optionList = selectList[i].options;
		for (let j = 0; j < optionList.length; j++) {
			let option = document.createElement('div');
			option.classList.add('option-item');
			option.value = optionList[j].value;
			option.innerText = optionList[j].text;
			option.dataset.selectIndex = i;
			if (j == 0) {
				select.innerText = optionList[j].text;
				option.classList.add('option-item-selected');
			}
			optionDiv.appendChild(option);
			option.onclick = function() {
				// 防止冒泡
				if (window.event) {
					window.event.cancelBubble = true;
				}
				// 删除原option选中样式
				let options = this.parentElement.children;
				for (let i = 0; i < options.length; i++) {
					options[i].classList.remove('option-item-selected');
				}
				// 修改select显示值
				let selectIndex = this.dataset.selectIndex;
				let selectText = document.getElementsByClassName('select-text');
				for (let i = 0; i < selectText.length; i++) {
					if (selectText[i].dataset.index == selectIndex) {
						selectText[i].innerText = option.innerText;
						// 修改option选中样式
						this.classList.add('option-item-selected');
						break;
					}
				}
				this.parentElement.style.display = 'none';
				// 给iframe传递数据
				postSelectorData();
			}
		}
		div.appendChild(optionDiv);
		// 监听点击事件
		div.onclick = function() {
			// 防止冒泡
			if (window.event) {
				window.event.cancelBubble = true;
			}
			// 展示/隐藏下拉框选项
			let optionDiv = document.getElementById('option' + this.dataset.index);
			optionDiv.style.display = optionDiv.style.display == 'none' ? 'flex' : 'none';
			optionDiv.style.top = this.offsetTop + 38 + 'px';
		}
		div.appendChild(select);
		div.appendChild(img);
		rightSelector.appendChild(div);
	}
	document.getElementById('content').onload = function() {
		// iframe加载完后再传递数据
		postSelectorData();
	};
}

// 隐藏下拉框选项
function hideOptions() {
	let selectorOptions = document.getElementsByClassName('selector-option');
	for (let i = 0; i < selectorOptions.length; i++) {
		selectorOptions[i].style.display = 'none';
	}
}

// 传递数据到iframe中
function postSelectorData() {
	let iframe = document.getElementById('content').contentWindow;
	let json = {};
	let selectors = document.getElementsByClassName('select-text');
	for (let i = 0; i < selectors.length; i++) {
		json[selectors[i].name] = selectors[i].innerText;
	}
	iframe.postMessage(JSON.stringify(json));
}

function setContentHeight() {
	let header = document.querySelector('.header');
	let headerHeight = header.offsetHeight;
	let content = document.querySelector('.content');
	// content.style.height = `calc(100%-${headerHeight}px)`;
	// content.setAttribute("style", `height: calc(100%-${headerHeight}px)`);
	console.log("content", content)
}

init();
setContentHeight();

// 获取 header 高度，计算 content iframe 的高度


window.onclick = function() {hideOptions();}
