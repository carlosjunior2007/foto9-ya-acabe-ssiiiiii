import React from'react';
import{createMaterialBottomTabNavigator}from'@react-navigation/material-bottom-tabs';
import Ionicons from'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text,View , Stylesheet ,Image} from "react-native-web";

export default class PostCard extends Component{
    constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
      is_liked: false,
      likes: this.props.story.value.likes
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  likeAction = () => {
    // console.log("this.state.story_id",this.state.story_id)
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes - 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes + 1), is_liked: true });
    }
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

    render(){
        return(       
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorImageContainer}>                   
                             <Image
                                 source={require("../assets/profile_img.png")}
                                 style={styles.profileImage}
                            ></Image>
                        </View>
                        <View style={styles.authorNameContainer}>
                            <Text style={styles.authorNameText}>{this.props.post.author}</Text>
                        </View>
                    </View>
                    <Image source={require("../ assets/post.jpeg")} style={styles.postImage}/>
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionText}>
                            {this.props.post.caption}
                        </Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                            <Ionicons name={"heart"} size={RFValue(30)} color = {"white"}/>
                            <Text style={styles.likeText}>12k</Text>
                        </View>
                </View>
            </View>
        </View>
    );
  }
}