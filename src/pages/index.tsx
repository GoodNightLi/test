import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const DraggableLineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const data = [];
  for (let i = 0; i < 96; i++) {
    data.push(Math.random() * 150);
  }

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          splitNumber: 96, // 设置轴线的刻度数量
          data: [
            '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45',
            '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45',
            '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45',
            '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
            '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
            '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45',
            '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45',
            '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45', '24:00'
          ],
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Electricity Usage',
            type: 'line',
            data: data,
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A'
                }
              }
            }
          }
        ]
      };

      chart.setOption(option);

      // 添加拖动事件
      let dragging = false;
      let currentPointIndex = -1;
      let startX = 0;
      let startY = 0;
      let startValue = 0;

      chart.getZr().on('mousedown', (event) => {
        const pointInPixel = [event.offsetX, event.offsetY];
        const points = chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel);

        if (points) {
          currentPointIndex = Math.round(points[0]);
          startX = event.offsetX;
          startY = event.offsetY;
          startValue = chart.getOption().series[0].data[currentPointIndex];
          dragging = true;
        }
      });

      chart.getZr().on('mousemove', (event) => {
        if (dragging && currentPointIndex !== -1) {
          const deltaY = event.offsetY - startY;
          const newData = chart.getOption().series[0].data.slice();
          newData[currentPointIndex] = startValue - deltaY;
          chart.setOption({
            series: [
              {
                data: newData
              }
            ]
          });
        }
      });

      chart.getZr().on('mouseup', () => {
        dragging = false;
        currentPointIndex = -1;
      });

      return () => {
        chart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default DraggableLineChart;