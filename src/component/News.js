import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor()
   {
    super();
    console.log("Hello I am constructor from news component");
     this.state={
      articles: [],
      loading: false,
      page:1
      
      

     }
      
    }

  async componentDidMount(){
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=112ec0a137274809ad3256af3bc408c1&page=1&pageSize=10";
    let data=await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults })
}

  
  handlePrevClick= async ()=>{
    console.log("Previous Callled");
    let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=112ec0a137274809ad3256af3bc408c1&page=${this.state.page - 1}&pageSize=10';
    let data=await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ 
      page: this.state.page - 1,
      articles: parsedData.articles })
  }

  handleNextClick = async () => {
    console.log("Next");
    let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=112ec0a137274809ad3256af3bc408c1&page=${this.state.page + 1}';
    let data=await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ 
      page: this.state.page + 1,
      articles: parsedData.articles })
    
     //console.log("NextLog",JSON.stringify(this.state.articles))
    //this.setState({ articles: parsedData.articles, page:this.state.page+1 }, () => {
      //console.log(this.state.articles);
    //})
  
}

  render() {
    //console.log("render");

    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        
        

        <div className="row">
       
         {this.state.articles.map((element)=>{
          //console.log("print hua array",element.title);
         

      
         return <div className="col-md-4" key={element.url}>
        
        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        
        </div>
                 
        })}
        
        
        </div>
        <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
      </div>
    )
  }
}

export default News
