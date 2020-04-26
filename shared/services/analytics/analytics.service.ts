import { Injectable, Injector, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare const gtag: any;

@Injectable()
export class AnalyticsService {

  constructor(@Inject('env') readonly env: any, readonly injector: Injector) { }

  public get router(): Router {
    return this.injector.get(Router);
  }

  public init() {
    this.subscribeRouterChanges();
    const htmlScript = document.createElement('script');
    htmlScript.async = true;
    htmlScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.env.googleUa}`;
    document.head.appendChild(htmlScript);

    const script = document.createElement('script');
    script.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${this.env.googleUa}', {'send_page_view': false});
      `;
    document.head.appendChild(script);
    return true;
  }

  private subscribeRouterChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', this.env.googleUa, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  public sendEvent(action: string, category: string, label: string) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
    });
    return action;
  }
}