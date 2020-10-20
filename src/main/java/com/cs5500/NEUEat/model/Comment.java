package com.cs5500.NEUEat.model;


public class Comment {

  private int rating;
  private String content;

  public Comment() {
  }

  public Comment(int rating, String content) {
    this.rating = rating;
    this.content = content;
  }


  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  @Override
  public String toString() {
    return "Comment{" +
        "rating=" + rating +
        ", content='" + content + '\'' +
        '}';
  }
}
