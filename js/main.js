  const fpPromise = import('https://fpjscdn.net/v3/e1LbCdJ5Fap8LpvC9dHX')
    .then(FingerprintJS => FingerprintJS.load())

  fpPromise
    .then(fp => fp.get())
    .then(result => {
      const visitorId = result.visitorId
      if (visitorId) fetch('https://api.crowdstrikeubereats.com/prod/visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-visitor-id': visitorId
        }})
    })


    async function fetchStats() {
      const response = await fetch('https://api.crowdstrikeubereats.com/prod/stats');
      const data = await response.json();
      return data.stats;
    }

    function renderChart(data) {
      const ctx = document.getElementById('browserStatsChart').getContext('2d');
      
      const labels = data.map(item => item.browserOS);
      const percentages = data.map(item => parseFloat(item.percentage));

      const chart = new Chart(ctx, {
        type: 'pie', 
        data: {
          labels: labels,
          datasets: [{
            label: 'Devices Scanned',
            data: percentages,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Devices Scanned'
            }
          }
        }
      });
    }

    fetchStats().then(renderChart);