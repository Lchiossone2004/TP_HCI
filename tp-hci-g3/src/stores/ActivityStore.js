import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref([])

  function loadActivities() {
    const savedActivities = localStorage.getItem('activities')
    if (savedActivities) {
      activities.value = JSON.parse(savedActivities)
    }
  }
  function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities.value))
  }
  function addActivity(activity) {
    const newActivity = {
      ...activity,
      date: new Date().toISOString(),
      id: Date.now() 
    }
    
    activities.value.unshift(newActivity)
    
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    
    activities.value = activities.value.filter(activity => 
      new Date(activity.date) > oneYearAgo
    )
    
    saveActivities()
  }

  const getFilteredActivities = computed(() => {
    return (month, year) => {
      return activities.value.filter(activity => {
        const activityDate = new Date(activity.date)
        return (month === -1 || activityDate.getMonth() === month) && 
               (year === -1 || activityDate.getFullYear() === year)
      })
    }
  })

  
  const getRecentActivities = computed(() => {
    return (limit = 10) => {
      return activities.value.slice(0, limit)
    }
  })

  return {
    activities,
    loadActivities,
    addActivity,
    getFilteredActivities,
    getRecentActivities
  }
}) 