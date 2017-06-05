import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface QueryResponse{
  currentUser
  loading
}

@Component({
  selector: 'op-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {


  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    const AllQuarters = gql`
      query AllQuarters {
        allQuarters {
          month,
          year
        }
      }
    `;

    this.apollo.watchQuery<QueryResponse>({
      query: AllQuarters
    }).subscribe(({data}) => {
      console.log('data', data);
    });
  }

}
