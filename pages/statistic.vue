<template>
    <div class="container">
        <!-- Go back button -->
        <div class="header">
          <nuxt-link class="go-back" to="/">
            Go back
          </nuxt-link>
          <h1>
            Statistic
          </h1>
        </div>
        <div class="grid">
          <div class="item">
            <client-only placeholder="Loading...">
              <h2 class="item__title">New Users</h2>
              <BarChart :chart-data="barChartData" />
            </client-only>
          </div>
          <div class="item">
            <client-only placeholder="Loading...">
              <h2 class="item__title">Orders by Month</h2>
              <LineChart :chart-data="lineChartData" />
            </client-only>
          </div>
          <div class="item">
            <client-only placeholder="Loading...">
              <h2 class="item__title">Products by Category</h2>
              <PieChart :chart-data="pieChartData" />
            </client-only>
          </div>
          <div class="item">
            <client-only placeholder="Loading...">
              <h2 class="item__title">Categories by Product</h2>
              <DoughnutChart :chart-data="doughnutChartData" />
            </client-only>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // Users
      barChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Users',
            backgroundColor: '#2648f1',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      // Orders
      lineChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Orders',
            // Blue
            backgroundColor: '#2648f1',
            data: [1321, 942, 1234, 1290, 1330, 1320, 1312]
          }
        ]
      },
      // Products
      pieChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Products',
            backgroundColor: ['#f87979', '#f8b379', '#f8f379', '#b3f879', '#79f8b3', '#79f8f8', '#79b3f8'],
            data: [15, 20, 30, 10, 20, 30, 10]
          }
        ]
      },
      // Categories
      doughnutChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Categories',
            backgroundColor: ['#f87979', '#f8b379', '#f8f379', '#b3f879', '#79f8b3', '#79f8f8', '#79b3f8'],
            data: [15, 20, 30, 10, 20, 30, 10]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

.container {
  width: clamp(0px, 90%, 1200px);

  margin: 0 auto;
  padding: 50px 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.header .go-back {
  font-size: 1.2rem;
  font-weight: 700;
  /* Blue */
  color: #2648f1;
  text-decoration: none;
}

.grid {
  display: grid;
  /* Auto and max 2 columns */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.item {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.item__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>