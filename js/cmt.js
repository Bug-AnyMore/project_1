function getCommentList() {
  $.ajax({
    method: "GET",
    url: "http://www.liulongbin.top:3006/api/cmtlist",
    // data: {},
    success: function(res) {
      // console.log(res);
      if (res.status !== 200) {
        return alert("获取评论列表失败")
      }
      var row = [];
      $.each(res.data, function(i, item) {
        var str = `
          <li class="list-group-item">
          <span class="badge" style="background-color:#F0AD4E ;">评论时间:${item.time}</span>
          <span class="badge" style="background-color: #5BC0DE;">评论人:${item.username}</span>
          ${item.content}
          </li>
          `;
        row.push(str);
      });
      $("#cmt-list").empty().append(row.join(''));
    }

  });
}
getCommentList();
$(function() {
  $("#formAddCmt").on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
      method: 'POST',
      url: "http://www.liulongbin.top:3006/api/addcmt",
      data: data,
      success: function(res) {
        if (res.status !== 201) {
          return alert('发表数据失败')
        }
        getCommentList();
        // 清空表单(需要在原生的js中清除，[0]转成原生js，而后调用reset方法)
        $('#formAddCmt')[0].reset();
      }
    });
  });

});