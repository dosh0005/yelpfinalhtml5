import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Spinner, Thumbnail } from 'native-base';
import { connect } from "react-redux";
import * as actions from "../app_function";
import MasterList from "./listVisual/MasterList";
import { Image } from "react-native";

class visualScreen extends Component {

    render() {
        let mainContent = {};
        let leftHeaderButton =
            <Left>
                    <Icon name='home' />
            </Left>;

        // Click Actions

        if(this.props.click_Back_To_Home){
            mainContent = <MasterList/>;
        }
        else if(this.props.Element_click){

            let distance = Math.round((this.props.Element_click.distance / 1000) * 100) / 100;

            leftHeaderButton =
                <Left>
                    <Button transparent onPress={this.props.back_To_Element_List}>
                        <Icon name='arrow-back' />
                        <Text>Back</Text>
                    </Button>
                </Left>;

            mainContent =
                <Card>
                    <CardItem>
                        <Body>
                            <Text center>{this.props.Element_click.name}</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri: this.props.Element_click.image_url}} style={{height: 247, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>Distance: {this.props.Element_click.rating} {distance} km</Text>
                            <Text>Rating: {this.props.Element_click.rating}</Text>
                            <Text>Price: {this.props.Element_click.price}</Text>
                            <Text>Phone: {this.props.Element_click.phone}</Text>
                        </Body>
                    </CardItem>
                </Card>;

        }
        else if(this.props.element_Fetching){
            mainContent =
                <Spinner/>;
        }
        else if(!this.props.data[0]) {
            mainContent =
                <Button full light onPress={this.props.element_data_fetched}><Text>Click to fetch live data</Text></Button>;
        }
        else{
            mainContent = <MasterList/>;
        }

        return (
            <Container>
                <Header>
                    {leftHeaderButton}
                    <Body>
                    <Title> Yelp Business Finder </Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ backgroundColor: "#f44242" }}>
                    {mainContent}
                </Content>
                <Footer>
                    <FooterTab full>
                        <Button>
                            <Text><Icon name='person' /></Text>
                            <Text>Harsh Doshi (dosh00005)</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        Element_click: state.Element_click,
        element_Fetching: state.element_Fetching,
        click_Back_To_Home: state.click_Back_To_Home,
        back_To_Element_List: state.back_To_Element_List,
        element_data_fetched: state.element_data_fetched
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        element_data_fetched: () => dispatch(actions.element_data_fetched()),
        back_To_Element_List: () => dispatch(actions.backToMasterList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(visualScreen);