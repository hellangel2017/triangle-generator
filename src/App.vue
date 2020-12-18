<template>
  <el-container>
    <el-header><div class="title">三角生成器</div></el-header>
    <el-container>
      <el-aside width="50%">
        <div class="form">
          <el-form :model="form" label-width="100px">
            <el-form-item label="方向">
              <el-radio-group v-model="form.direction" @change="getCssWithType">
                <el-radio :label="0">上</el-radio>
                <el-radio :label="1">下</el-radio>
                <el-radio :label="2">左</el-radio>
                <el-radio :label="3">右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="形状">
              <el-radio-group v-model="form.type" @change="getCssWithType">
                <el-radio :label="0">三角形</el-radio>
                <el-radio :label="1">箭头</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="宽度">
              <el-slider v-model="form.width" :max="200" @change="getCssWithType"></el-slider>
            </el-form-item>
            <el-form-item label="高度">
              <el-slider v-model="form.height" :max="200" @change="getCssWithType"></el-slider>
            </el-form-item>
            <!-- <el-form-item label="旋转角度">
              <el-slider v-model="form.angle" :max="360" @change="getCss"></el-slider>
            </el-form-item> -->
            <el-form-item label="颜色">
              <el-color-picker v-model="form.color" :predefine="predefineColors" show-alpha @active-change="handleChange"></el-color-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
      <el-main>
        <div class="background">
          <div :style="cssStyle" class="triangle"></div>
        </div>
      </el-main>
    </el-container>
    <el-footer height="250px">
      <h3>CSS代码：</h3>
      <el-input type="textarea" v-model="code" :autosize="{ minRows: 8, maxRows: 12}"></el-input>
    </el-footer>
  </el-container>
  
</template>

<script>
import {ref, reactive, onMounted} from 'vue'
export default {
  setup(){
    const code = ref("");
    const form = reactive({
      direction: 0,
      width: 50,
      height: 50,
      angle: 0,
      type:0,
      color: '#1e90ff'
    });
    const cssStyle = ref(null);
    const predefineColors = reactive([
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)'])

    onMounted(() =>{
      getCssWithType();
    })

    const handleChange = (value) =>{
      form.color = value;
      if (form.type === 1) {
        getArrowCss();
      } else {
        getTriganleCss();
      }
    }

    const getCssWithType = () =>{
      if (form.type === 1) {
        getArrowCss();
      } else {
        getTriganleCss();
      }
    }

    const getArrowTransform = (direction) =>{
       const transform = {
        '0': {
          transform:`rotate(225deg)`
        },
        '1': {
          transform:`rotate(45deg)`
        },
        '2': {
          transform: 'rotate(135deg)'
        },
        '3': {
          transform:`rotate(-45deg)`
        }
      }
      return transform[direction];
    }

    const getBorderWidthAndColor = (direction, w, h, color) =>{
      const borderWidthAndColor = {
        '0': {
          borderWidth:`0 ${w/2}px ${h}px ${w/2}px`,
          borderColor: `transparent transparent ${color} transparent`
        },
        '1': {
          borderWidth:`${h}px ${w/2}px 0 ${w/2}px`,
          borderColor: `${color} transparent transparent transparent`
        },
        '2': {
          borderWidth:`${h/2}px ${w}px ${h/2}px 0`,
          borderColor: `transparent ${color} transparent transparent`
        },
        '3': {
          borderWidth:`${h/2}px 0 ${h/2}px ${w}px`,
          borderColor: `transparent transparent transparent ${color}`
        }
      }

      return borderWidthAndColor[direction];
    }

    const getArrowCss = () =>{
      let css = getArrowTransform(form.direction);
      let length = Math.floor(Math.sqrt(Math.pow(form.width/2 , 2) + Math.pow(form.height , 2)));
      css.display = "inline-block";
      css.width = length + "px";
      css.height = length + "px";
      css.borderWidth = "0 2px 2px 0";
      css.borderStyle = "solid";
      css.borderColor = form.color;
      cssStyle.value = css;
      code.value = transformCss(css);
    }

    const getTriganleCss = () =>{
      let css = getBorderWidthAndColor(form.direction, form.width, form.height, form.color);
      css.display = "inline-block";
      css.width = "0";
      css.height = "0";
      css.borderStyle = "solid";
      css.transform = `rotate(${form.angle}deg)`;
      cssStyle.value = css;
      code.value = transformCss(css);
    }

    const transformCss = (css) =>{
      return `display:inline-block;
width:${css.width};
height:${css.height};
border-style:solid;
transform:${css.transform};
border-width:${css.borderWidth};
border-color:${css.borderColor};`;
    }

    return {
      form,
      code,
      cssStyle,
      predefineColors,
      handleChange,
      getCssWithType,
      getArrowTransform,
      getBorderWidthAndColor,
      getArrowCss,
      getTriganleCss,
      transformCss
    }
  }

}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #f0f0f0;
  width: 100vw;
  height: 100vh;
}
.title {
  color: #888;
  font-size: 20px;
  line-height: 60px;
}
.form{
  padding: 20px 20px 0 200px;
}
.el-form{
  background: #fff;
  height: 360px;
  max-width: 500px;
  float: right;
}
.el-form-item__content{
  padding: 0 40px 0 10px;
  text-align: left;
}
.background{
  width: 360px;
  height: 360px;
  line-height: 360px;
  background: #eee;
  background-size: 30px 30px;
  background-position: 0 0,15px 15px;
  background-image: linear-gradient(45deg,rgba(0,0,0,.2) 25%,transparent 0,transparent 75%,rgba(0,0,0,.2) 0),linear-gradient(45deg,rgba(0,0,0,.2) 25%,transparent 0,transparent 75%,rgba(0,0,0,.2) 0);
}
.el-textarea{
  width: 820px;
}
.triangle{
  transition: all 0.6s;
}
</style>
