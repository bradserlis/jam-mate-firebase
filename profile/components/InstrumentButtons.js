<FlatList 
              data={items}
              renderItem={({item}) => 
              <TouchableOpacity
              onPress={
                () => this._onPress()
              }
              style={{margin:8, height:25, backgroundColor:buttonBg, borderColor:'dodgerblue', borderWidth:1}}
              >
              <Text style={{textAlign:'center', color:textColor, letterSpacing: 1.5, padding:4}}>{item}</Text>
              </TouchableOpacity>    
              }
              keyExtractor={(item, index) => index.toString()}
              >
</FlatList>



// testing the checkbox
            <Row>
            <ListItem>
              <CheckBox color="green">
                <Body>
                  <Text> Guitar </Text>
                </Body>
              </CheckBox>
            </ListItem>
            <ListItem>
              <CheckBox color="green">
              <Body>
                  <Text> Bass </Text>
                </Body>
              </CheckBox>
            </ListItem>
            <ListItem>
              <CheckBox color="green">
              <Body>
                  <Text> Drums </Text>
                </Body>
              </CheckBox>
            </ListItem>
            <ListItem>
              <CheckBox color="green">
              <Body>
                  <Text> Vocals(Aggressive) </Text>
                </Body>
              </CheckBox>
            </ListItem>
            <ListItem>
              <CheckBox color="green">
              <Body>
                  <Text> Vocals </Text>
                </Body>
              </CheckBox>
            </ListItem>
            </Row>