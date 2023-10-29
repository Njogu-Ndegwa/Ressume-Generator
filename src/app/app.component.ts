import { Component } from '@angular/core';
import { ResumeGeneratorService } from './resume-generator.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'resume_generator';
  jobResponsibilities:any
  projectsCompleted:any = `
SmartData: A B2B lead prospecting platform

M-Rescue: System connecting service providers with motorists in an emergency

Management Information System(MIS)`
  selfDescription:any
  jobPosition:any
  techUsed:any
  showContent:boolean = false
  content:any = ''
  constructor(
    private resumeGeneratorService: ResumeGeneratorService
  ) {}

  resumeGenerator() {
    console.log(
      this.jobResponsibilities,
      this.projectsCompleted,
      this.selfDescription,
      this.jobPosition,
      this.techUsed,
      '------------------26-----------------'
      )
    this.resumeGeneratorService.resumeGenerator(  
      this.jobResponsibilities,
      this.projectsCompleted,
      this.selfDescription,
      this.jobPosition,
      this.techUsed).subscribe((res) => {
        this.content = res
        this.showContent = true
        this.content = res
      console.log(res, '--------Res---------')
    })
  }

  resumeGeneratorStream() {
    let body = {
      job_responsibility: this.jobResponsibilities,
      projects_completed: this.projectsCompleted,
      self_description: this.selfDescription,
      job_position: this.jobPosition,
      tech_used: this.techUsed
    }
    this.resumeGeneratorService.chatStream(body).subscribe(
      data => {
        this.showContent = true
        console.log(data)
        this.content += data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
