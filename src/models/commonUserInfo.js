/**
 * Created by change on 16/6/17.
 */

h5.CommonUserInfo = cc.Class.extend({
    ctor:function(){
        this.m_name = "";
        this.m_gender = 0;
        this.m_vipLev = 0;
        this.m_chip = 0;


    },
    parse:function(json){
        this.m_name = json["name"];
        this.m_gender = json["gender"];
        this.m_vipLev = json["vipLev"];
        this.m_chip = json["chip"];

    }


});