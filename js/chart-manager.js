/**
 * Chart Manager
 * Gestiona la creación y actualización de gráficos con Chart.js
 */

class ChartManager {
    constructor() {
        this.charts = {};
    }

    /**
     * Crear gráfico de estado SOAT (Pie Chart)
     */
    createSOATStatusChart(data) {
        const ctx = document.getElementById('soatStatusChart');
        if (!ctx) return;

        // Destruir gráfico anterior si existe
        if (this.charts.soatStatus) {
            this.charts.soatStatus.destroy();
        }

        const grouped = sharePointService.groupSOATByStatus(data);
        const colors = {
            'Activo': '#10B981',
            'Por Vencer': '#F59E0B',
            'Vencido': '#EF4444'
        };

        this.charts.soatStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(grouped),
                datasets: [{
                    data: Object.values(grouped),
                    backgroundColor: Object.keys(grouped).map(status => colors[status] || '#3B82F6'),
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: { size: 13 },
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    /**
     * Crear gráfico SOAT por mes (Line Chart)
     */
    createSOATMonthChart(data) {
        const ctx = document.getElementById('soatMonthChart');
        if (!ctx) return;

        if (this.charts.soatMonth) {
            this.charts.soatMonth.destroy();
        }

        const grouped = sharePointService.groupByMonth(data, 'FechaCreacion');
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const values = months.map(month => grouped[month] || 0);

        this.charts.soatMonth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Reportes SOAT',
                    data: values,
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563EB',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            font: { size: 13 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Crear gráfico de estado Vehicular (Pie Chart)
     */
    createVehicularStatusChart(data) {
        const ctx = document.getElementById('vehicularStatusChart');
        if (!ctx) return;

        if (this.charts.vehicularStatus) {
            this.charts.vehicularStatus.destroy();
        }

        const grouped = {};
        data.forEach(item => {
            if (!grouped[item.Estado]) {
                grouped[item.Estado] = 0;
            }
            grouped[item.Estado]++;
        });

        const colors = {
            'Disponible': '#10B981',
            'En Uso': '#3B82F6',
            'Mantenimiento': '#F59E0B',
            'Alerta': '#EF4444'
        };

        this.charts.vehicularStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(grouped),
                datasets: [{
                    data: Object.values(grouped),
                    backgroundColor: Object.keys(grouped).map(status => colors[status] || '#8B5CF6'),
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: { size: 13 },
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    /**
     * Crear gráfico Vehicular por tipo (Bar Chart)
     */
    createVehicularTypeChart(data) {
        const ctx = document.getElementById('vehicularTypeChart');
        if (!ctx) return;

        if (this.charts.vehicularType) {
            this.charts.vehicularType.destroy();
        }

        const grouped = sharePointService.groupVehicularByType(data);

        this.charts.vehicularType = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(grouped),
                datasets: [{
                    label: 'Cantidad de Vehículos',
                    data: Object.values(grouped),
                    backgroundColor: [
                        '#8B5CF6',
                        '#06B6D4',
                        '#EC4899',
                        '#14B8A6'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            font: { size: 13 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Actualizar todos los gráficos SOAT
     */
    updateSOATCharts(data) {
        this.createSOATStatusChart(data);
        this.createSOATMonthChart(data);
    }

    /**
     * Actualizar todos los gráficos Vehicular
     */
    updateVehicularCharts(data) {
        this.createVehicularStatusChart(data);
        this.createVehicularTypeChart(data);
    }
}

// Instancia global del gestor de gráficos
const chartManager = new ChartManager();
