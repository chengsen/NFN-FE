<template>
  <div>
    <div class="pheader">智慧党建后台管理系统</div>
    <main class="pbody">
      <div class="box-card">
        <div class="secHeader">党员信息采集表</div>
        <div class="tools">
          <el-select
            class="branchSwitch"
            v-model="currentBranch"
            placeholder="转入支部"
            @change="onSearch"
          >
            <el-option
              v-for="item in branch"
              :key="item"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-input
            class="nameInput"
            v-model="userName"
            placeholder="姓名"
            @keyup.enter.native="onSearch"
          ></el-input>
          <el-button class="toolsBtn" type="primary" @click="onSearch"
            >搜索</el-button
          >
          <el-button class="toolsBtn" @click="onClear">取消</el-button>
        </div>

        <el-table
          :data="tableData"
          @cell-mouse-enter="cellEnter"
          header-row-class-name="headerRow"
          row-class-name="rowStyle"
          cell-class-name="cellStyle"
        >
          <el-table-column prop="userName" label="姓名"> </el-table-column>
          <el-table-column prop="transferFrom" label="接受支部">
          </el-table-column>
          <el-table-column prop="updatedDate" label="提交时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popover
                class="showQrBtn"
                placement="top-start"
                :aaa="scope.row"
                trigger="hover"
                @after-leave="hideQrCode"
              >
                <vue-qr
                  :text="qrCodeUrl"
                  :size="200"
                  @click.native="openURL"
                ></vue-qr>
                <el-button type="text" slot="reference">查看二维码</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 进度条 -->
        <div class="pageSwitch">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalItems"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import vueQr from 'vue-qr';
import { branch } from '../../data/index.json';

export default {
  components: {
    vueQr,
  },
  data() {
    return {
      branch,
      // 查询需要的
      currentBranch: '',
      userName: '',
      isSearch: false, // 判断是否在查询

      qrCodeUrl: '',

      tableData: [],

      currentRow: -1,
      totalItems: 0, // 总条目数
      currentPage: 1,
      pageSize: 10, // 每页显示条目个数
    };
  },
  created() {
    // 第一次挂载时就加载第一页数据
    document.title = '智慧党建后台管理系统';
    fetch(`${this.Common.prefixUrl}/userQuery?page=1`, {
      method: 'GET',
    }).then((response) => response.json()).then((res) => {
      this.tableData = res.result;
      this.totalItems = res.resultCount;
    });
  },
  methods: {
    openURL() {
      window.open(this.qrCodeUrl, '__black');
    },
    // 根据页数查询数据
    getData() {
      fetch(`${this.Common.prefixUrl}/userQuery?page=${this.currentPage}`, {
        method: 'GET',
      }).then((response) => response.json()).then((res) => {
        this.tableData = res.result;
        this.totalItems = res.resultCount;
      });
    },
    // 改变页数
    handleCurrentChange(val) {
      console.log('改变页数', val);
      if (this.isSearch) {
        this.onSearch();
      } else {
        this.currentPage = val;
        this.getData();
      }
    },
    /* eslint no-underscore-dangle: 0 */
    cellEnter(row, column, cell, event) {
      this.qrCodeUrl = `http://localhost:8080/pc/infoShow?_id=${row._id}`;
    },
    // 搜索返回
    onSearch() {
      if (!this.isSearch) {
        this.isSearch = true;
        this.currentPage = 1;
      }
      console.log(this.currentBranch, this.userName);
      fetch(`${this.Common.prefixUrl}/userQuery?page=${this.currentPage}&branch=${this.currentBranch}&userName=${this.userName}`, {
        method: 'GET',
      }).then((response) => response.json()).then((res) => {
        this.tableData = res.result;
        this.totalItems = res.resultCount;
      });
    },
    onClear() {
      this.currentBranch = '';
      this.userName = '';
      this.isSearch = false;
      this.getData();
    },
  },
};
</script>

<style lang='scss'>
@import "index.scss";
</style>
