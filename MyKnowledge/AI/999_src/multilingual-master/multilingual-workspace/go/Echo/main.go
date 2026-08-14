package main

import (
	/* サーバー起動用のパッケージ */
	"net/http"
	/* テンプレート用パッケージ */
	"html/template"
	/* 入出力を扱うパッケージ */
	"io"
	/* ミドルウェア用パッケージ */
	"github.com/labstack/echo/middleware"
	/* メインのフレームワークにechoを使用 */
	"github.com/labstack/echo"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

/* 共通使用するデータ用の構造体 */
type CommonData struct {
	/* field名は大文字で始める */
	Title string
}

/* メインページ表示 */
func viewMainPage(c echo.Context) error {
	/* テンプレートに渡す値をセット */
	var common = CommonData{
		"メインページ",
	}
	data := struct {
		/* field名は大文字で始める */
		CommonData
		ContentString string
	}{
		CommonData:    common,
		ContentString: "文章",
	}

	/* Renderでhtmlを表示 */
	return c.Render(http.StatusOK, "mainPage", data)
}

/* メインページ表示2 */
func viewMainPage2(c echo.Context) error {
	/* テンプレートに渡す値をセット */
	var common = CommonData{
		"メインページ2",
	}
	data := struct {
		/* field名は大文字で始める */
		CommonData
	}{
		CommonData: common,
	}

	/* Renderでhtmlを表示 */
	return c.Render(http.StatusOK, "mainPage", data)
}

/* 遷移先ページ */
func viewDetailPage(c echo.Context) error {
	/* QueryParamでクエリの値を取得する */
	code := c.QueryParam("code")
	/* テンプレートに渡す値をセット */
	var common = CommonData{
		"遷移先ページ",
	}
	data := struct {
		/* field名は大文字で始める */
		CommonData
		Code string
	}{
		CommonData: common,
		Code:       code,
	}
	/* Renderでhtmlを表示 */
	return c.Render(http.StatusOK, "detailPage", data)
}

func main() {
	/* echoのインスタンス作成 */
	e := echo.New()

	/* テンプレートの設定(viewsフォルダの.htmlファイルが対象) */
	t := &Template{
		templates: template.Must(template.ParseGlob("views/*.html")),
	}
	e.Renderer = t

	/* ミドルウェア類 */
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	/* メインページ表示 */
	e.GET("/main", viewMainPage)
	/* メインページ2表示 */
	e.GET("/main2", viewMainPage2)
	/* メインページ2からの遷移先ページ */
	e.GET("/detailPage", viewDetailPage)

	/* サーバー起動 */
	e.Logger.Fatal(e.Start(":1323"))
}
