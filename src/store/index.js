import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = { //要设置的全局访问的state对象
    //table头部列表
    tablist: [{
            name: "我的地盘",
            icon: require("img/myhj.png"),
            path: "/home/myEnvironment"
        }, {
            name: "拜访日志",
            icon: require("img/mysq.png"),
            path: "/home/myBusiness"
        }, {
            name: "作战指南",
            icon: require("img/mycenter.png"),
            path: "/home/inventory2"
        }, {
            name: "活动查询",
            icon: require("img/jhjy.png"),
            path: "/home/stockGuide"
        }, 
        // {
        //     name: "我的奖金",
        //     icon: require("img/ppxq.png"),
        //     path: "/home/brandDemand"
        // },
        {
            name: "客户查找",
            icon: require("img/kcyh.png"),
            path: "/home/seek"
        },
        {
            name: "培训资料",
            icon: require("img/ppxq.png"),
            path: "/home/Training"
        }

    ]
};
const store = new Vuex.Store({
    state
});

export default store;