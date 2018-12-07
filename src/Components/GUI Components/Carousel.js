import React, { Component } from 'react';
import  {Carousel, CarouselCaption, CarouselInner, CarouselItem, View, Mask, Container } from 'mdbreact';
import Evolution from '../../assets/evolution.jpg'
import Tree1 from '../../assets/tree1.JPG'
import Tree3 from '../../assets/Tree3.jpg'
import World from '../../assets/world.png'


class CarouselPage extends Component {
    render(){
        return(
            <Container>
                <h4 className="carousel-indicators" />
                <Carousel
                    activeItem={1}
                    length={4}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-1">
                    <CarouselInner>
                        <CarouselItem itemId="1">
                            <View>
                                <img className="d-block w-100" src={Tree1} alt="First slide" />
                                <Mask overlay="Family Tree"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Family Tree</h3>
                                <p>GeneTree</p>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="2">
                            <View>
                                <img className="d-block w-100" src={Tree3} alt="Second slide" />
                                <Mask overlay="Tree"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Tree 2</h3>
                                <p>Family Tree</p>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="3">
                            <View>
                                <img className="d-block w-100" src={Evolution} alt="Third slide" />
                                <Mask overlay="black-slight"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Evolution</h3>
                                <p>Genetics</p>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="4">
                            <View>
                                <img className="d-block w-100" src={World} alt="world's item" />
                                <Mask overlay="world"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Sopot Beach</h3>
                                <p>world</p>
                            </CarouselCaption>
                        </CarouselItem>
                    </CarouselInner>
                </Carousel>
            </Container>
        );
    }
}

export default CarouselPage;