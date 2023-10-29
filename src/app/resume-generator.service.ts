import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResumeGeneratorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  resumeGenerator(
    jobResponsibilities:any,
    projectsCompleted:any,
    selfDescription:any,
    jobPosition:any,
    techUsed:any) {
    return this.httpClient.post(`${environment.api}resume-generator`, {
      job_responsibility: jobResponsibilities,
      projects_completed: projectsCompleted,
      self_description: selfDescription,
      job_position: jobPosition,
      tech_used: techUsed
    })
  }

  chatStream(body: any): Observable<string> {
    return new Observable<string>(observer => {
      fetch(`${environment.api}resume-generator`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        console.log(reader, '----38----')
        function push() {
          return reader?.read().then(({ done, value }) => {
            if (done) {
              observer.complete();
              return;
            }
            const events = decoder.decode(value).split('\n\n');
            let content = '';
            for (let i = 0; i < events.length; i++) {
              const event = events[i];
              if (event === 'data: [DONE]') break;
              // if (event && event.slice(0, 6) === 'data: ') {
                // const data = JSON.parse(event.slice(6));
                content += event
                // content += data.choices.delta?.content || '';
                console.log(content, 'The Content')
              // }
            }
            observer.next(content);
            push();
          });
        }
        push();
      }).catch((err: Error) => {
        observer.error(err);
      });
    });
  }

}
