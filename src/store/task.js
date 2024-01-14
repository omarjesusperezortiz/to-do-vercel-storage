// /src/store/task.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: []
    }),
    actions: {
        async fetchTasks() {
            try {
                const response = await axios.get('/api/tasks/get');
                this.tasks = response.data;
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },

        async addTask(title, description) {
            try {
                const response = await axios.post('/api/tasks/post', { title, description });
                this.tasks.push(response.data); // Add the new task to the state
            } catch (error) {
                console.error('Error adding task:', error);
            }
        },

        async updateTask(id, title, description) {
            try {
                const response = await axios.put('/api/tasks/put', { id, title, description });
                const updatedTaskIndex = this.tasks.findIndex(task => task.id === id);
                if (updatedTaskIndex !== -1) {
                    this.tasks[updatedTaskIndex] = response.data;
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        },

        async deleteTask(id) {
            try {
                await axios.delete('/api/tasks/delete', { data: { id } });
                this.tasks = this.tasks.filter(task => task.id !== id);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        },

        async toggleTask(id, isComplete) {
            try {
                const response = await axios.put('/api/tasks/put', { id, is_complete: isComplete });
                const updatedTaskIndex = this.tasks.findIndex(task => task.id === id);
                if (updatedTaskIndex !== -1) {
                    this.tasks[updatedTaskIndex] = response.data;
                }
            } catch (error) {
                console.error('Error toggling task:', error);
            }
        },
    }
});
