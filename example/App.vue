<template>
  <div id="app">
    <areaSelectLsq
      :level="level"
      :areaJson="areaJson"
      :chooseData="chooseData"
      @changeArea="changeArea"
    ></areaSelectLsq>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {},
  data() {
    return {
      // 可以自传选项
      areaJson: [
        // { 100000: "a", 110000: "b", 120000: "c" },
        // {
        //   100100: "a1",
        //   100200: "a2",
        //   100300: "a3",
        //   110100: "b1",
        //   110200: "b2",
        //   110300: "b3",
        //   120100: "c1",
        //   120200: "c2"
        // }
      ],
      // 区域等级，有1、2、3等3种选项
      level: 2,
      // 绑定值
      chooseData: {
        // province: { id: "120000000000", label: "天津市" },
        // city: { id: "120100000000", label: "市辖区" }
        // area: { id: "120105000000", label: "河北区" }
      },
    };
  },
  methods: {
    changeArea(v) {
      this.chooseData = v;
    },
  },
};
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
}
</style>
