import Vue from 'vue'
import Router from 'vue-router'
import longin from '@/moudel/land/longin'

//主页
import home from '@/moudel/home'






//w我的底盘
import myEnvironment from '@/moudel/my/myEnvironment.vue'

//拜访日志
import myBusiness from '@/moudel/VisitLog/myBusiness.vue'
import fristchild2 from '@/moudel/interactive/fristchild2.vue'



//活动查询
import stockGuide from '@/moudel/sport/stockGuide.vue'

//我的奖金
import brandDemand from '@/moudel/my/brandDemand.vue'
// 我的奖金查看排名
import ranking from '@/moudel/my/ranking.vue'
//客户查询
import seek from '@/moudel/Spare/seek.vue'
// 客户查找地图
import seekmap from '@/moudel/Spare/seekmap.vue'

//备用标题1
import inventory1 from '@/moudel/Spare/inventory1.vue'
// 作战指南
import inventory2 from '@/moudel/Spare/inventory2.vue'
// 作战指南零售户
import inventory2Shop from '@/moudel/Spare/inventory2Shop.vue'

//培训资料
import Training  from '@/moudel/Spare/visit3.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: "/home/myEnvironment"
    },
    {
      path: '/',
      name: 'longin',
      component: longin
    },
    {
      path: '/home',
      name: 'home',
      component: home,

      children: [{
          path: 'myEnvironment',
          name: 'myEnvironment',
          component: myEnvironment
        },
        {
          path: 'myBusiness',
          name: 'myBusiness',
          component: myBusiness,
          meta: {
            keepAlive: true // 不需要缓存
          }
        },
        {
          path: 'stockGuide',
          name: 'stockGuide',
          component: stockGuide
        },
        {
          path: 'brandDemand',
          name: 'brandDemand',
          component: brandDemand
        },
        {
          path: 'ranking',
          name: 'ranking',
          component: ranking
        },
        {
          path: 'inventory1',
          name: 'inventory1',
          component: inventory1
        },
        {
          path: 'inventory2',
          name: 'inventory2',
          component: inventory2
        },
        {
          path: 'inventory2Shop',
          name: 'inventory2Shop',
          component: inventory2Shop
        },
        {
          path: 'seek',
          name: 'seek',
          component: seek
        }, {
          path: 'seekmap',
          name: 'seekmap',
          component: seekmap
        },
        {
          path:'Training',
          name:'Training',
          component:Training
        },
        {
          path:'myBusiness/fristchild2',
          name:'fristchild2',
          component:fristchild2
        }
      ]

    },
  ]
})

   