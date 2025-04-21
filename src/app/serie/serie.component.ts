import { Component, OnInit } from '@angular/core';
import { SerieService } from './serie.service';
import { Serie } from './serie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css'],
  imports: [CommonModule],
})
export class SerieComponent implements OnInit {
  series: Serie[] = [];
  averageSeasons: number = 0;

  constructor(private service: SerieService) {}

  ngOnInit(): void {
    this.getSeriesList();
  }

  private getSeriesList(): void {
    this.service.getSeries().subscribe((data) => {
      this.series = data;
      this.calculateAverageSeasons();
      this.updateTable();
    });
  }

  private calculateAverageSeasons(): void {
    if (this.series.length) {
      const total = this.series.reduce((sum, s) => sum + s.seasons, 0);
      this.averageSeasons = total / this.series.length;
    }
  }

  trackBySerie(index: number, s: Serie): number {
    return s.id;
  }

  updateTable(): void {
    const tableBody = document.querySelector("#seriesTable tbody") as HTMLTableSectionElement;
    if (!tableBody) {
      console.error("Table body not found.");
      return;
    }
    tableBody.innerHTML = "";
    const averageValue = this.averageSeasons;

    this.series.forEach((serie) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${serie.id}</td>
        <td><a href="#" class="serie-link">${serie.name}</a></td>
        <td>${serie.channel}</td>
        <td>${serie.seasons}</td>
      `;
      tableBody.appendChild(row);
      const serieLink = row.querySelector(".serie-link") as HTMLAnchorElement;
      if (serieLink) {
        serieLink.addEventListener("click", (e: Event) => {
          e.preventDefault();
          this.renderCard(serie);
        });
      }
    });

    const mediaRow = document.createElement("tr");
    mediaRow.innerHTML = `
      <td colspan="3">Average seasons</td>
      <td>${averageValue}</td>
    `;
    tableBody.appendChild(mediaRow);
  }

  renderCard(serie: Serie): void {
    console.log('Rendering card for:', serie);
    const cardContainer = document.getElementById("serieCard");
    if (!cardContainer) {
      console.error("There's no container to render the card.");
      return;
    }
    
    if (!serie.name && !serie.poster && !serie.description && !serie.webpage) {
      cardContainer.classList.add("d-none");
      return;
    }
    
    cardContainer.classList.remove("d-none");
    cardContainer.innerHTML = `
      <img class="card-img-top" src="${serie.poster}" alt="Card">
      <div class="card-body">
        <h5 class="card-title">${serie.name}</h5>
        <p class="card-text">${serie.description}</p>
        <a href="${serie.webpage}" class="btn btn-primary" target="_blank">Go to the website</a>
      </div>
    `;
  }
}
