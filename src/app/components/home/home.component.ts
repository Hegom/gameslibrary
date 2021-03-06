import { APIResponse } from './../../models';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public sort: string = 'metacritic';
  public games: Array<Game> | undefined;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, searchFilter?: string): void {
    this.httpService
      .getGameList(sort, searchFilter)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }
}
