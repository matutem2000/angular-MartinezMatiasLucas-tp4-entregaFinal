import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs/internal/Subject";

@Injectable()
export class LoadingService {
   private loadingTriggered$ = new BehaviorSubject<boolean>(false);

    public isLoading$= this.loadingTriggered$.asObservable();

    setIsLoading(value: boolean): void{
            this.loadingTriggered$.next(value);
    }
}