import Vue from 'vue'
import { Bar, Line, Doughnut, Pie } from 'vue-chartjs'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    BarElement,
    LineElement,
    ArcElement,
    LinearScale,
    CategoryScale
);

Vue.component('BarChart', Bar);

Vue.component('LineChart', Line);

Vue.component('DoughnutChart', Doughnut);

Vue.component('PieChart', Pie);

