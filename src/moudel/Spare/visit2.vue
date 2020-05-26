<template>
  <div class="page">
    <el-table :data="tableData" border height="550" style="width: 100%">
      <el-table-column prop="shop_name" label="零售户名称">
      </el-table-column>
      <el-table-column prop="contacts" label="负责人">
      </el-table-column>
      <el-table-column prop="cycle" label="访销周期">
      </el-table-column>
      <el-table-column prop="target" label="目标量">
      </el-table-column>
      <el-table-column prop="projected" label="预计增量">
      </el-table-column>
      <el-table-column label="负责人电话">
        <template slot-scope="scope">
          <p><a :href="'tel:' + scope.row.phone_no">{{ scope.row.phone_no }}</a></p>
          <!-- <p  @click="handleEdit(scope.$index, scope.row)"  >姓名: {{ scope.row.phone }}</p> -->
          <!-- <p>住址: {{ scope.row.address }}</p> -->

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "page",
    data() {
      return {
        tableData: []
      }
    },
    components: {

    },
    mounted: function () {
      let vm = this;
      vm.$axios
        .get(`${this.$apihost}` + "/wechat/api/optshop/")
        .then(function (response) {
          console.log(response.data)
          vm.tableData = response.data.data
        });
    },
    methods: {
      handleEdit(index, row) {
        console.log(row.phone);
      },
    }
  }

</script>

<style scoped>
  .page {
    width: 100%;
    padding: 15px;
    height: 300px;
  }

</style>
