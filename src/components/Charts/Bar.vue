<!--<script>-->
<!--import { defineComponent, h } from 'vue'-->

<!--import { Doughnut } from 'vue-chartjs'-->
<!--import {-->
<!--  Chart as ChartJS,-->
<!--  Title,-->
<!--  Tooltip,-->
<!--  Legend,-->
<!--  ArcElement,-->
<!--  CategoryScale-->
<!--} from 'chart.js'-->

<!--ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)-->

<!--export default defineComponent({-->
<!--  name: 'DoughnutChart',-->
<!--  components: {-->
<!--    Doughnut-->
<!--  },-->
<!--props: {-->
<!--chartId: {-->
<!--type: String,-->
<!--default: 'doughnut-chart'-->
<!--},-->
<!--width: {-->
<!--type: Number,-->
<!--default: 400-->
<!--},-->
<!--height: {-->
<!--type: Number,-->
<!--default: 400-->
<!--},-->
<!--cssClasses: {-->
<!--default: '',-->
<!--type: String-->
<!--},-->
<!--styles: {-->
<!--type: Object,-->
<!--default: () => {}-->
<!--},-->
<!--plugins: {-->
<!--type: Array,-->
<!--default: () => []-->
<!--},-->
<!--data: {-->
<!--type: Object,-->
<!--required: true-->
<!--}-->
<!--},-->
<!--  setup(props) {-->
<!--    const chartOptions = {-->
<!--      responsive: true,-->
<!--      maintainAspectRatio: false-->
<!--    }-->

<!--    return () =>-->
<!--        h(Doughnut,{-->
<!--          chartData: props.data,-->
<!--          chartOptions,-->
<!--          chartId: props.chartId,-->
<!--          width: props.width,-->
<!--          height: props.height,-->
<!--          cssClasses: props.cssClasses,-->
<!--          styles: props.styles,-->
<!--          plugins: props.plugins-->
<!--        })-->
<!--  }-->
<!--})-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<script>
import {Bar} from 'vue-chartjs'
import {ref, h} from 'vue'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {
      }
    },
    plugins: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      // required: true
    }
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    // return the render function
    return () => h(Bar, {
          data: props.data,
          chartOptions,
          width: props.width
        },
        [])
  }
}
</script>