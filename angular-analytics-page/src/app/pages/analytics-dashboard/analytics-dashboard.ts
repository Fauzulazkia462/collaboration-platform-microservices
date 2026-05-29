import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-dashboard.html',
  styleUrls: ['./analytics-dashboard.css']
})
export class AnalyticsDashboard implements OnInit {

  projects: any[] = [];
  activities: any[] = [];
  todayStats: any = null;

  loading = false;

  async ngOnInit() {
    await this.loadProjects();
    await this.loadTodayStats();
  }

  async loadProjects() {
    this.loading = true;

    try {
      const res = await ApiService.getProjects();
      this.projects = res.data;
    } finally {
      this.loading = false;
    }
  }

  async loadTodayStats() {
    const res = await ApiService.getTodayTasks();
    this.todayStats = res.data;
  }

  async openProject(project: any) {
    const res = await ApiService.getActivitiesByProject(project.id);
    this.activities = res.data;
  }
}