import React, { useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { Header, Left, Right, Body, Tab, Tabs, ListItem, Thumbnail, Badge, Fab, Icon, Button } from "native-base"
import moment from 'moment'
import { Menu, Divider } from 'react-native-paper'

import { TmIcon } from '../../Components/TmIcon'
import { TmText } from "../../Components/TmText"
import Assets from '../../Assets'
import { TmView } from '../../Components/TmView'
import { TmTouchableOpacity } from '../../Components/TmTouchableOpacity'

export default ({ navigation, route }) => {
  console.log('route??', route)

  const [visibleThreeDot, setVisibleThreeDot] = useState(false)

  const openThreeDot = () => setVisibleThreeDot(true)

  const closeThreeDot = () => setVisibleThreeDot(false)


  //states
  const [classFabActive, setClassFabActive] = useState(false)
  const [inviteCodeToJoin, setInviteCodeToJoin] = useState('')
  const [allPeople, setAllPeople] = useState([])

  //selectors
  const commonDataStoreReducer = useSelector((state) => state.commonDataStoreReducer)
  const userReducer = useSelector((state) => state.userReducer)

  const renderListing = ({ item }) => {
    return (
      <ListItem onPress={() => handleClassClicked(item)} avatar>
        <Left>
          <Thumbnail source={{ uri: item?.classAvatar?.small }} />
        </Left>
        <Body>
          <TmText classHeader>{item.className}</TmText>
          <TmText numberOfLines={2}>{item.classDescription}</TmText>
          <TmText classesCreatedDate>{moment(item.createdAt).format('MMMM Do YYYY')}</TmText>
        </Body>
        <Right>
          <TmView row>
            {(item?.creatorId == userReducer?.user?.userId || item?.peopleJoined[userReducer?.user?.userId]?.isAdmin) && <TmIcon onPress={() => handleEditClasses(item)} name='pencil' color={Assets.Colors.black} />}
            {(item?.creatorId == userReducer?.user?.userId || item?.peopleJoined[userReducer?.user?.userId]?.isAdmin) && <TmIcon onPress={() => handleDeleteClasses(item)} name='delete' color={Assets.Colors.red} />}
            {isNotApproved(item) && <TmIcon name='lock' color={Assets.Colors.black} />}
          </TmView>
        </Right>
      </ListItem>
    )
  }

  const renderPeople = ({ item }) => {
    const uri = item?.user?.photoURL || item?.thumbnailPath
    return (
      <ListItem onPress={() => handlePeopleClicked(item)} avatar>
        <Left>
          <Thumbnail source={uri ? { uri } : Assets.user} />
        </Left>
        <Body>
          <TmText classHeader>{item?.user?.displayName || item?.displayName || 'no name'}</TmText>
          <TmText numberOfLines={2}>{item?.user?.email || item?.emailAddresses?.[0]?.email || item?.phoneNumbers?.[0]?.number}</TmText>
          <TmText classesCreatedDate>{item?.isAdmin ? 'Admin' : item?.isParent ? 'Parent' : item?.isStudent ? 'Student' : item?.isTeacher ? 'Teacher' : 'Guest (unregistered)'}</TmText>
        </Body>
        {item?.isJoined ?
          <Right>
            {/* <TmView row>
              <Badge success>
                <TmText newMsgBadge>21</TmText>
              </Badge>
            </TmView> */}
          </Right>
          :
          <Right>
            <TmView row>
              <TmTouchableOpacity onPress={() => alert(
                item?.phoneNumbers?.[0]?.number ?
                  'Call on phone ' + item?.phoneNumbers?.[0]?.number + ' and ask to signup.'
                  :
                  'Email on ' + item?.emailAddresses?.[0]?.email + ' and ask to signup.')}>
                <Badge warning>
                  <TmText newMsgBadge>invite</TmText>
                </Badge>
              </TmTouchableOpacity>
            </TmView>
          </Right>
        }
      </ListItem>
    )
  }

  const handleEditClasses = (editClassData) => {
    setClassData(editClassData)
    setShowCreateClassForm(true)
  }

  const handleCreateClass = () => {
    setShowCreateClassForm(true)
  }

  const handleCloseCreateClassForm = () => {
    setShowCreateClassForm(false)
    setClassFabActive(false)
    setClassData(initialClassData)
  }

  const handleCloseJoinForm = () => {
    setShowJoinUsingInviteCodeForm(false)
    setClassFabActive(false)
    setInviteCodeToJoin('')
  }

  const isValidatedClassData = () => {
    if (!classData?.classAvatar?.small) {
      return;
    }
    if (!classData?.className) {
      return;
    }
    if (!classData?.classDescription) {
      return;
    }
    return true
  }

  const handleSubmitClassForm = () => {
    console.log('classData??', classData)

    if (!isValidatedClassData()) {
      return;
    }

    let finalData = classData
    if (!classData.id) {
      //reassigning finalData
      finalData = {
        ...classData,
        createdAt: new Date().getTime(),
        creatorId: userReducer?.user?.userId,
        peopleJoined: {
          [userReducer?.user?.userId]: { ...userReducer, isNotApproved: false, isAdmin: true, joinedAt: new Date().getTime() }
        },
        classAvatar: {
          small: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Red_link_logo.png', //TODO: change it to dynamic pic upload
          medium: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Red_link_logo.png',
          large: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Red_link_logo.png',
          ...(classData?.classAvatar || {})
        }
      }
    } else {
      var finalChatData = {
        toClassId: finalData?.id,
        messagesData: {
          createdAt: new Date().getTime(),
          text: (userReducer?.user?.displayName || userReducer?.user?.displayName) + ' updated this class.',
          image: '',
          user: {
            _id: userReducer?.user?.userId,
            name: userReducer?.user?.displayName,
            avatar: userReducer?.user?.photoURL,
          },
          system: true,
        }
      }
      console.log('finalChatData??', finalChatData)
      createClassMessageToFireBase(finalChatData)
    }
    console.log('finalData??', finalData)
    handleCloseCreateClassForm()
  }

  const handleDeleteClasses = (item) => {
    Alert.alert(
      "Are you sure want to delete?",
      "it cannot be undone once deleted.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            //write delete login or call function from services
            let finalData = { ...item, isDeleted: true }
            updateClassToFireBase(finalData)
          }
        }
      ],
      { cancelable: false }
    )
  }

  const handleJoinClass = () => {
    setShowJoinUsingInviteCodeForm(true)
  }

  const handleSubmitJoinForm = () => {
    console.log('inviteCodeToJoin??', inviteCodeToJoin)
    if (!inviteCodeToJoin) {
      return;
    }
    handleCloseJoinForm()
  }

  const handleUploadClassAvatar = () => {
    console.log('clicked...')
    const options = {
      title: 'Select class avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
  }


  return (
    <TmView>
      <Header hasTabs style={styles.header}>
        <Left>
          <TmView row centeredVertical>
            <TmIcon onPress={() => navigation.toggleDrawer()} color="gray" name='menu' />
            <TmText>{commonDataStoreReducer?.headerData?.title}</TmText>
          </TmView>
        </Left>
        <Right>
          <Menu
            visible={visibleThreeDot}
            onDismiss={closeThreeDot}
            anchor={<TmIcon onPress={openThreeDot} color="gray" name='dots-vertical' />}>
            <Menu.Item onPress={() => {
              closeThreeDot()
              handleCreateClass()
            }} title="New class" />
            <Divider />
            <Menu.Item onPress={() => {
              closeThreeDot()
              handleJoinClass()
            }} title="Join class" />
          </Menu>
        </Right>
      </Header>

      <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 2 }}>
        <Tab
          heading="Classes"
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          textStyle={styles.textStyle}
          activeTextStyle={styles.activeTextStyle}
        >
          <FlatList
            extraData={[]}
            data={[]}
            renderItem={renderListing}
            keyExtractor={(item, i) => i.toString()}
            ListEmptyComponent={<TmView emptyContainer><TmText>No data available, please create by pressing '+' button.</TmText></TmView>}
          />
          <Fab
            active={classFabActive}
            direction="up"
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
          // onPress={() => setClassFabActive(!classFabActive)}
          >
            <Icon name="plus" type='FontAwesome' />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <TmIcon onPress={() => handleCreateClass()} color={Assets.Colors.white} name='plus' />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <TmIcon onPress={() => handleJoinClass()} color={Assets.Colors.white} name='send-circle-outline' />
            </Button>
          </Fab>
        </Tab>
        <Tab
          heading="People"
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          textStyle={styles.textStyle}
          activeTextStyle={styles.activeTextStyle}
        >
          <FlatList
            data={[...allPeople]}
            renderItem={renderPeople}
            keyExtractor={(item, i) => i.toString()}
            ListEmptyComponent={<TmView emptyContainer><TmText>No people available.</TmText></TmView>}
          />
          <Fab
            active={classFabActive}
            direction="up"
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => setClassFabActive(!classFabActive)}>
            <Icon name="plus" type='FontAwesome' />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <TmIcon onPress={() => handleCreateClass()} color={Assets.Colors.white} name='plus' />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <TmIcon onPress={() => handleJoinClass()} color={Assets.Colors.white} name='send-circle-outline' />
            </Button>
          </Fab>
        </Tab>
      </Tabs>
    </TmView>
  )
}

const styles = {
  header: {
    backgroundColor: 'white'
  },
  tabStyle: {
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'gray',
    // fontFamily: 'ProximaNova-Regular',
  },
  activeTextStyle: {
    color: 'black',
    // fontFamily: 'ProximaNova-Bold',
  },
}
